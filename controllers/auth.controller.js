const userModel = require("../models/user.model");
const validationResult = require("express-validator").validationResult;

module.exports.getSignUp = (req, res, next) => {
  res.render("signUp",{
    userNameError:req.flash('userNameError')[0],
    emailError:req.flash('emailError')[0],
    passwordError:req.flash('passwordError')[0],
    confirmPasswordError:req.flash('confirmPasswordError')[0],
    isAuth:false
  });
};

module.exports.postSignUp = (req, res, next) => {
  //check if email is exists or not
  //exists => throw error
  //else=>create new user
  
  let validationErrors = validationResult(req).array();
  if (validationErrors.length == 0) {
    userModel
      .createUser(req.body.username, req.body.email, req.body.password)
      .then(() => {
        res.redirect("/signin");
      })
      .catch((err) => {
        console.log(err)
        res.redirect("/signup");
      });
  }else{
    console.log('point 1');
    let errorMessages = new Map();
    for(let err of validationErrors){
        errorMessages[err.param] = err.msg;
    }
    req.flash('userNameError',errorMessages['username']);
    req.flash('passwordError',errorMessages['password']);
    req.flash('confirmPasswordError',errorMessages['confirmpassword']);
    req.flash('emailError',errorMessages['email']);
    res.redirect("/signup");
  }
};

module.exports.getSignIn = (req, res, next) => {
  res.render("signin", {
    loginError: req.flash("loginError")[0],
    emailError:req.flash("emailError")[0],
    passwordError:req.flash("passwordError")[0],
    isAuth:false
  });
};

module.exports.postSignIn = (req, res, next) => {
  let errorlist = validationResult(req).array();
  
  if(errorlist.length === 0){
  userModel
    .login(req.body.email, req.body.password)
    .then((user) => {
      req.session.userId = user._id;
      req.session.userName = user.username;
      req.session.userEmail = user.email;
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("loginError", err);
      res.redirect("/signin");
    });
  }else{
    let errorMessages = new Map();
    for(let err of errorlist){
        errorMessages[err.param] = err.msg;
    }
    req.flash('emailError',errorMessages['email']);
    req.flash('passwordError',errorMessages['password']);
    res.redirect("/signin");
  }
};

module.exports.logout = (req, res, next) => {
  req.session.destroy(()=>{
    res.redirect("/");
  })
}