const ProductModel = require('../models/products.model');

/**
 * 
 * @param {*} req comming request
 * @param {*} res response object
 * @param {*} next 
 * @return  return home page
 */
module.exports.getHome = (req,res,next)=>{
    // get products then render home page
    ProductModel.getAllProducts().then(
        (products)=>{
            res.render('index',{
                products:products
            })
        }
    ).catch(err=>console.log('error in show home page'))
}