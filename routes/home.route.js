const router = require('express').Router();

const homeController = require('../controllers/home.controller');

// route to home page
router.get('/',homeController.getHome)


module.exports = router;