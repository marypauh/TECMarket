const express = require('express')
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');

const User = require('../models/users');

router.get('/login',(req, res) => {
    res.render('login');
});

router.get('/register',(req, res) => {
  res.render('signup');
});
 

router.post('/register/new', async (req, res) => {
  let errors = [];
  const { id, name, email, telephone, dateU, type, user, password} = req.body;
  if(errors.length > 0){
    res.render('signup', {errors, id, name, email, telephone, dateU, type, user, password});
  } else {
    // Look for username coincidence
    const nameU = await User.findOne({user: user});
    if(nameU) {
      console.log("The user already exists");
      res.redirect('/register');
    } else {
      // Saving a New User
      const newUser = new User(req.body);
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.redirect('/login');
    }
  }
});

  router.post('/login/new',passport.authenticate('local'),async (req, res) => { 
      
    const {user} = req.body;
        const {password} = req.body;
    const username = await Usuario.findOne({user:user});
    const typeU = user.type
    if (typeU == 1) {
      console.log("Employee");
      res.redirect('/markets/create');
    }
  
    if (typeU == 2) {
      console.log("Client");
     res.redirect('/orders/create');
    
    } 
  });  


  
  router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/login');
  });
  
  module.exports = router;

