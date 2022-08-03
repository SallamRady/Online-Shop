const ProductModel = require("../models/products.model");

/**
 *
 * @param {*} req comming request
 * @param {*} res response object
 * @param {*} next
 * @return  return home page
 */
module.exports.getHome = (req, res, next) => {
  // declaration
  let category = req.query.category || 'all';
  let myPromise;
  
  if (category === "all") myPromise = ProductModel.getAllProducts();
  else myPromise = ProductModel.getProductsByCategory(category);

  // get products then render home page
  myPromise.then((products) => {
      res.render("index", {
        products: products,
        category:category
      });
    })
    .catch((err) => console.log("error in show home page"));
};
