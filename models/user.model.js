const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

// declaration
const DB_URL = "mongodb://localhost:27017/online-shop";

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('user',userSchema);

module.exports.createUser = (username,email,password)=>{
    return new Promise((resolve, reject)=>{
        mongoose.connect(DB_URL).then(
            ()=>{
                return User.findOne({email:email});
            }
        ).then(
            (user)=>{
                if(user){
                    mongoose.disconnect();
                    reject('this email is already exist');
                }else{
                    return bcrypt.hash(password,10);
                }
            }
        ).then(
            (hashedPassword)=>{
                let user = new User({
                    username,
                    email,
                    password:hashedPassword
                });
                user.save().then(
                    ()=>{
                        mongoose.disconnect();
                        resolve();
                    }
                ).catch(
                    (err)=>{
                        console.log('error in create user :',err);
                        mongoose.disconnect();
                        reject();
                    }
                )
            }
        ).catch(
            (err)=>{
                mongoose.disconnect();
                reject(err);
            }
        )
    });
}