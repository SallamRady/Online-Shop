const { models } = require('mongoose');
const ProductModel = require('../models/products.model');

module.exports.getAddProduct = (req, res, next)=>{
    res.render('admin/addProduct');
}

module.exports.postSaveProduct = (req, res, next) => {
    let newProduct = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:req.body.image,
    }
    ProductModel.postSaveProduct(newProduct).then(
        ()=>{
            res.redirect('/')
        }
    ).catch(
        err=>console.log('error in create product : ',err)
    );
}