const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home.route');
const adminRouter = require('./routes/admin.route');
const productRouter = require('./routes/product.route');
const authRouter = require('./routes/auth.route');
const flash  = require('connect-flash');

// declaration
const PORT = process.env.PORT || 3000;
const DB_URL = "mongodb://localhost:27017/online-shop";

// create server application&&serverconfigrarion
const app = express();
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

// session setting
const session  = require('express-session');
const { application } = require('express');
const SessionStore = require('connect-mongodb-session')(session);
const Store = new SessionStore({
    uri:DB_URL,
    collection:'sessions'
});
app.use(session({
    secret:"this is our secret",
    resave: true,
    saveUninitialized:false,
    cookie:{
        maxAge:2*60*60*100//2hours
    },
    store:Store
}));
// for uploaded images
app.use(express.static(path.join(__dirname,'images')));
app.set('view engine','ejs');
app.set('views','views');

app.use(authRouter);
app.use(homeRouter);
app.use('/product',productRouter);
app.use('/admin',adminRouter);

app.listen(PORT,
    ()=>console.log(`server running on port : ${PORT}`)
);