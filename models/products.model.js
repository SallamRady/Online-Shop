const mongoose = require('mongoose');

// declaration
const DB_URL = 'mongodb://localhost:27017/online-shop';

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    description:String,
    category:String,
    price:Number
});

const Product = mongoose.model('product',productSchema);

module.exports.getAllProducts = ()=>{
    /*return our custom promise*/
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(
            ()=>{
                return Product.find({});
            }
        ).then(
            result=>{
                mongoose.disconnect();
                resolve(result);
            }
        ).catch(
            err=>reject(err)
        );
    });
}