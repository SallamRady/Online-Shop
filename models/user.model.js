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


module.exports.login = (email,password)=>{
    // check if email is exists
    // if no --> error else yes ->check password
    // password yes-->set session else[no]-->error
    return new Promise((resolve, reject) => {
        console.log(email,password);
        mongoose.connect(DB_URL).then(
            ()=>{
                return User.findOne({email:email});
            }
        ).then(
            (user)=>{
                if(!user){
                    mongoose.disconnect();
                    reject('there is no user with this mail');
                }else{
                    bcrypt.compare(password,user.password).then(
                        (same)=>{
                            if(!same){
                                mongoose.disconnect();
                                reject('password is incorrect');
                            }else{
                                mongoose.disconnect();
                                resolve(user);
                            }
                        }
                    )
                }
            }
        ).catch(
            (err)=>{
                mongoose.disconnect();
                reject('error:',err);
            }
        );
    });
}