const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', (req,res)=>{
    res.send("connected!!!");
})

//get all the products...
router.get('/products', async(req, res)=>{

    const products = await Product.find({});
    res.render('index',{products});
})

router.post('/products', async(req,res)=>{
    console.log(req.body);
    await Product.create(req.body);
    res.redirect('/products');
})

//form to create new product...
router.get('/products/new',(req,res)=>{
    res.render('new');
})

router.get('/products/:id', async(req,res)=>{
    const {id} = req.params;
    //console.log('1');
    console.log(req.params.id);
    const product = await Product.findById(id);
    res.render('show',{product});
})

router.patch('/products/:id', async(req,res)=>{
    //console.log('2');
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/products/${req.params.id}`);
})



router.get('/products/:id/edit', async(req,res)=>{
    
    const product = await Product.findById(req.params.id);
    res.render('edit',{product});
})

router.delete('/products/:id', async(req,res) =>{

    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products'); 
})

module.exports = router;