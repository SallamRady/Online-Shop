const router = require('express').Router();

const productController = require('../controllers/product.controller');

// route to home page
router.get('/product/:id',productController.getProductDetails)


module.exports = router;