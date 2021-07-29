const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const productRoutes = require('./routes/product');
const methodOverride = require('method-override');
//const seedDB = require('./seed');

mongoose.connect('mongodb://localhost:27017/shopApp', 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
  })
.then(()=>{
    console.log("DB Connected!!");
})
.catch((err)=>{
    console.log("OH NO ERROR!!!");
    console.log(err);
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(productRoutes);

app.get('/',(req,res)=>{
    res.send("Landing Page");
})

//seedDB();

app.listen(3000, ()=>{
    console.log("Server Started AT PORT 3000");
})