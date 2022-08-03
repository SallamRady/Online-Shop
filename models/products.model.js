const mongoose = require("mongoose");

// declaration
const DB_URL = "mongodb://localhost:27017/online-shop";

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  category: String,
  price: Number,
});

const Product = mongoose.model("product", productSchema);

module.exports.getAllProducts = () => {
  /*return our custom promise*/
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL, { useNewUrlParser: true })
      .then(() => {
        Product.find()
          .then((data) => {
            mongoose.disconnect();
            resolve(data);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

module.exports.getProductsByCategory = (category) => {
  /*return our custom promise*/
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL, { useNewUrlParser: true })
      .then(() => {
        Product.find({ category: category })
          .then((data) => {
            mongoose.disconnect();
            resolve(data);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

module.exports.postSaveProduct = (poduct) => {
  /*return our custom promise*/
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let newProduct = new Product({ ...poduct });
        return newProduct;
      })
      .then((newProduct) => {
        newProduct
          .save()
          .then(() => {
            mongoose.disconnect();
            resolve(newProduct);
          })
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
