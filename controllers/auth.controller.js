const userModel = require("../models/user.model");

module.exports.getSignUp = (req, res, next) => {
    res.render('signUp');
};

module.exports.postSignUp = (req, res, next) => {
    //check if email is exists or not
    //exists => throw error
    //else=>create new user
    console.log(req.body.username,req.body.email,req.body.password)
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