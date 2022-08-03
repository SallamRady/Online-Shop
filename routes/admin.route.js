const router = require('express').Router();
const AdminRouter = require('../controllers/admin.controller');

router.get('/addProduct',AdminRouter.getAddProduct);

router.post('/saveproduct',AdminRouter.postSaveProduct);

module.exports = router;