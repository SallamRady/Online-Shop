module.exports.isAuth = (req, res, next)=>{
    // if loggin continue else go to login page
    if(req.session.userId) next();
    else res.redirect('/signin');
}

module.exports.notAuth = (req, res, next)=>{
    // if loggin continue else go to login page
    if(req.session.userId) res.redirect('/');
    else next();
}