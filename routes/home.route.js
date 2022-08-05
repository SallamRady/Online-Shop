const router = require('express').Router();
const AuthGuard = require('../guards/auth.guard');
const homeController = require('../controllers/home.controller');

// route to home page
router.get('/',AuthGuard.isAuth,homeController.getHome)


module.exports = router;