const express = require('express')
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');

const Usuario = require('../models/usuarios');

router.get('/login',(req, res) => {
    res.render('login');
});

router.get('/registrar',(req, res) => {
  res.render('signup');
});
 
router.get('/admin',(req, res) => {
    res.render('admin');
});

router.get('/pasajeroM',(req, res) => {
  res.render('pasajeroM');
});

router.get('/funcionarioM',(req, res) => {
  res.render('funcionarioM');
});



router.post('/registrar/nuevo', async (req, res) => {
  let errors = [];
  const { cedula, nombre, email, telefono, fecha, tipo, usuario, password} = req.body;
  if(errors.length > 0){
    res.render('signup', {errors, cedula, nombre, email, telefono, fecha, tipo, usuario, password});
  } else {
    // Look for email coincidence
    const nombreU = await Usuario.findOne({usuario: usuario});
    if(nombreU) {
      console.log("El usuario ya existe");
      res.redirect('/registrar');
    } else {
      // Saving a New User
      const newUser = new Usuario(req.body);
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      res.redirect('/login');
    }
  }
});

  router.post('/login/nuevo',passport.authenticate('local'),async (req, res) => { 
      
    const {usuario} = req.body;
        const {password} = req.body;
    const user = await Usuario.findOne({usuario:usuario});
    const tipoU = user.tipo
    if (tipoU == 1) {
      console.log("Empleado");
      res.redirect('/super/create');
    }
  
    if (tipoU == 2) {
      console.log("Cliente");
     res.redirect('/pedidos/create');
    
    } 
  });  


  
  router.get('/users/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
  });
  
  module.exports = router;

