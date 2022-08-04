const userModel = require("../models/user.model");

module.exports.getSignUp = (req, res, next) => {
    res.render('signUp');
};

module.exports.postSignUp = (req, res, next) => {
    //check if email is exists or not
    //exists => throw error
    //else=>create new user
    userModel.createUser(req.body.username,req.body.email,req.body.password).then(
        ()=>{
            res.redirect('/signin');
        }
    ).catch(
        err=>{
            console.log('errrrror:',err);
            res.redirect('/signup');
        }
    )
};

module.exports.getSignIn = (req, res, next) => {
    res.render('signin');
};

module.exports.postSignIn = (req, res, next) => {
    console.log(req.body.email,req.body.password)
    userModel.login(req.body.email,req.body.password).then(
        (user)=>{
            req.session.userId = user._id;
            req.session.userName = user.username;
            req.session.userEmail = user.email;
            res.redirect('/');
        }
    ).catch(
        err=>{
            console.log('errrrror in login :',err);
            res.redirect('/signin');
        }
    )
};