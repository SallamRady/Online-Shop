const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const check = require('express-validator').check;
const AuthGuard = require('../guards/auth.guard');

// go to signup page
router.get('/signup',AuthGuard.notAuth,AuthController.getSignUp);

router.post('/signup',
AuthGuard.notAuth,
check('username').not().isEmpty().withMessage('username is required'),
check('email').not().isEmpty().isEmail().withMessage('email is invalid'),
check('password').isLength({min:6}),
check('confirmpassword').custom((value,{req})=>{
    if(value === req.body.password) return true;
    else throw "passwords don't equals"
}),
AuthController.postSignUp);
// go to signin page
router.get('/signin',AuthGuard.notAuth,AuthController.getSignIn);

router.post('/signin',
AuthGuard.notAuth,
check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('email is invalid'),
check('password').not().isEmpty().withMessage('password is required'),
AuthController.postSignIn);

router.all('/logout',AuthController.logout);


module.exports = router;