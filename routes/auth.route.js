const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const check = require('express-validator').check;

// go to signup page
router.get('/signup',AuthController.getSignUp);

router.post('/signup',
check('username').not().isEmpty().withMessage('username is required'),
check('email').not().isEmpty().isEmail().withMessage('email is invalid'),
check('password').isLength({min:6}),
check('confirmpassword').custom((value,{req})=>{
    if(value === require.body.password) return true;
    else throw "passwords don't equals"
}),
AuthController.postSignUp);
// go to signin page
router.get('/signin',AuthController.getSignIn);

router.post('/signin',
check('email').not().isEmpty().withMessage('email is required').isEmail().withMessage('email is invalid'),
check('password').not().isEmpty().withMessage('password is required'),
AuthController.postSignIn);

router.all('/logout',AuthController.logout);


module.exports = router;