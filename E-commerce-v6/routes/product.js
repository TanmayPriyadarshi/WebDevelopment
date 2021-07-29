const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware');

//This is used to display all the products...
router.get('/products', async (req,res)=>{
    try{
    const products = await Product.find({});
    res.render('products/index',{products});
    }
    catch(e){
        console.log("Something Went Wrong");
        req.flash('error','Cannot find Product');
        res.redirect('/error'); 
    }
})

//This is used to create a new product
router.post('/products',isLoggedIn, async(req,res)=>{
    try{
        await Product.create(req.body.product);
        req.flash('success','Product Created successfully');
        res.redirect('/products');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Create Product, something is wrong');
        res.redirect('/error'); 
    }
})

//This is used to display the form for new product...
router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('products/new');
})

//This is used to dispaly the entire detail for particular product...
router.get('/products/:id', async(req,res)=>{
    try{
    const product = await Product.findById(req.params.id).populate('reviews');
    res.render('products/show',{product});//while using render function we don't have to add / at the very beginning.
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Display  Product, something is wrong');
        res.redirect('/error'); 
    }
})

//This is used to update specific product
router.patch('/products/:id',isLoggedIn, async(req,res)=>{
    try{
    await Product.findByIdAndUpdate(req.params.id,req.body.product);
    req.flash('success','Product Updated Successfully');
    res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Update  Product, something is wrong');
        res.redirect('/error');
    }
})

//This is used to delete specific product
router.delete('/products/:id',isLoggedIn, async(req,res)=>{
    try{
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Delete  Product, something is wrong');
        res.redirect('/error');  
    }
})

//This is used to edit the content of specific product
router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    try{
    const product = await Product.findById(req.params.id);
    res.render('products/edit',{product});
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Edit  Product, something is wrong');
        res.redirect('/error');
    }
})

//This is used to post any review to a product
router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    try{
    const product = await Product.findById(req.params.id);
    const review = new Review({
        user:req.user.username,
        ...req.body});
    
    product.reviews.push(review);
    await review.save();
    await product.save();

    res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Cannot Save Review, something is wrong');
        res.redirect('/error');
    }
})

router.get('/error', (req, res) => {
    res.status(404).render('error');
})


module.exports = router;