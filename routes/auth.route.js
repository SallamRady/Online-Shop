const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
// go to signup page
router.get('/signup',AuthController.getSignUp);

router.post('/signup',AuthController.postSignUp);
// go to signin page
router.get('/signin',AuthController.getSignIn);

router.post('/signin',AuthController.postSignIn);


module.exports = router;