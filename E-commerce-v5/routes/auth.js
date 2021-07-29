const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport =  require('passport');




// router.get('/fakeUser',async(req,res)=>{

//     const user = new User({email: 'tanmay@gmail.com',username:'tanmay'});
//     const newUser = await User.register(user,'tanmay@27');
//     res.send(newUser);

// })

//This is used to open the register the user form.
router.get('/register', async(req,res)=>{
    res.render('auth/signup');
})

//This is used to actually register a new user.
router.post('/register', async(req,res)=>{
    try{
    const user = new User({username: req.body.username, email: req.body.email});
    const newUser = await User.register(user, req.body.password);
    console.log(newUser);
    req.flash('success','Registered Successfully');
    res.redirect('/products');
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

router.get('/login',async(req,res)=>{

    res.render('auth/login');
})

router.post('/login',
passport.authenticate('local', 
{   
    failureRedirect: '/login',
    failureFlash: true 
}),
(req,res)=>{
    req.flash('success',`Welcome Back!!! ${req.user.username}`);
    console.log(req.user);
    res.redirect('/products');
});

router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success','logged out successfully!!!'); 
    res.redirect('/login');
})

module.exports = router;