const ProductModel = require("../models/products.model");

/**
 *
 * @param {*} req comming request
 * @param {*} res response object
 * @param {*} next
 * @return  return product details page
 */
module.exports.getProductDetails = (req, res, next) => {
  // declaration
  let id = req.params.id;
  
  // get products then render home page
  ProductModel.getProductsById(id).then((product) => {
      res.render("product", {
        product: product,
      });
    })
    .catch((err) =>{
      console.log("error in show product details page");
      res.render("product", {
        product: undefined,
      });
    });
};


module.exports.getFirstProduct = (req, res, next) => {
  // declaration
  
  // get products then render home page
  ProductModel.getFirstProduct().then((product) => {
      res.render("product", {
        product: product,
      });
    })
    .catch((err) =>{
      console.log("error in show product details page");
      res.render("product", {
        product: undefined,
      });
    });
};