const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home.route');
const adminRouter = require('./routes/admin.route');
const productRouter = require('./routes/product.route');

// declaration
const PORT = process.env.PORT || 3000;

// create server application&&serverconfigrarion
const app = express();
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.urlencoded({ extended: true }));

// for uploaded images
app.use(express.static(path.join(__dirname,'images')));
app.set('view engine','ejs');
app.set('views','views');

app.use(homeRouter);
app.use('/product',productRouter);
app.use('/admin',adminRouter);

app.listen(PORT,
    ()=>console.log(`server running on port : ${PORT}`)
);