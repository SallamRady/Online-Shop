const express = require('express');
const path = require('path');
const homeRouter = require('./routes/home.route');

// declaration
const PORT = process.env.PORT || 3000;

// create server application&&serverconfigrarion
const app = express();
app.use(express.static(path.join(__dirname,'assets')));
// for uploaded images
app.use(express.static(path.join(__dirname,'images')));
app.set('view engine','ejs');
app.set('views','views');

app.get('/',homeRouter);

app.listen(PORT,
    ()=>console.log(`server running on port : ${PORT}`)
);