const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// const seedDB = require('./seed');
const methodOverride = require('method-override');
const Product = require('./models/product');
const productRoutes = require('./routes/product');


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


//DataBase related code fragment....
mongoose.connect('mongodb://localhost/shopApp', 
   {    useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    })
.then( data =>{
    console.log('Database connected!!!!');
})
.catch(err =>{
    console.log('connection error');
    console.log(err);
})

//code fragment to create data in database for the first time.
//seedDB();

app.use(productRoutes);

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})