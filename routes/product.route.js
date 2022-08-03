const router = require('express').Router();

const productController = require('../controllers/product.controller');
router.get('/',productController.getFirstProduct);
// route to product details page
router.get('/:id',productController.getProductDetails)


module.exports = router;