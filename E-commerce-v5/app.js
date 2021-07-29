const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
//const seedDB = require('./seed');

//All the route based imports are below:-->
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/auth');

mongoose.connect('mongodb://localhost:27017/shopApp', 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex:true
  })
.then(()=>{
    console.log("DB Connected!!");
})
.catch((err)=>{
    console.log("OH NO ERROR!!!");
    console.log(err);
})


const sessionConfig = {
    secret: 'icanhavebettersecret',
    resave: false,
    saveUninitialized: true,
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.use(session(sessionConfig));
app.use(flash());

//Always remember that if your app is using  session then in that case 
//do use that passport.session() after the actual session middleware.(i.e. after line 40 session)

//Initilization of passport and Session for storing the users information.
app.use(passport.initialize());
app.use(passport.session());

//Configuring the passport to use local strategy.
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})



app.get('/',(req,res)=>{
    res.send("Landing Page");
})

app.use(productRoutes);
app.use(userRoutes);

//seedDB();

app.listen(3000, ()=>{
    console.log("Server Started AT PORT 3000");
})