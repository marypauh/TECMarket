const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


const Producto = require('../models/productos');
const Super =  require('../models/super');

router.post('/productos/nuevo',async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();
  res.redirect('/productos/all');
});


router.get('/productos/all', async (req, res) => {
  const productos = await Producto.find().sort({date: 'desc'});
  res.render('empleados/productos/allProductos', { productos });
});

router.get('/productos/create',(req, res) => {
    res.render('empleados/productos/createProductos');
});


router.get('/productos/edit/:id', async (req,res) => {
  const producto = await Producto.findById(req.params.id);
  res.render('empleados/productos/editProductos',{producto});
});

router.put('/productos/edit-producto/:id', async (req, res) => {
 const {IdProducto} = req.body;
 const {Nombre} = req.body;
 const {Descripcion} = req.body;
 const {Cantidad} = req.body;

 const producto = await Producto.findById(req.params.id);
  producto.idProducto = IdProducto;
  producto.nombre =  Nombre;
  producto.descripcion = Descripcion;
  producto.cantidad = Cantidad;

 await producto.save();
 res.redirect('/productos/all')
});

router.delete('/producto/delete/:id', async (req,res) =>{
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect('/productos/all')
});


//Super


router.post('/super/nuevo',async (req, res) => {
  const nuevoSuper = new Super(req.body);
  await nuevoSuper.save();
  res.redirect('/super/all');
});


router.get('/super/all', async (req, res) => {
  const supers = await Super.find().sort({date: 'desc'});
  res.render('empleados/super/allSuper', { supers });
});

router.get('/super/create',(req, res) => {
    res.render('empleados/super/createSuper');
});


router.get('/super/edit/:id', async (req,res) => {
  const supers = await Super.findById(req.params.id);
  res.render('empleados/super/editSuper',{supers});
});

router.put('/super/edit-super/:id', async (req, res) => {
 const {Latitud} = req.body;
 const {Longitud} = req.body;
 const {Direccion} = req.body;

 const supers = await Super.findById(req.params.id);
  supers.latitud = Latitud;
  supers.longitud = Longitud;
  supers.direccion = Direccion;

 await supers.save();
 res.redirect('/super/all')
});

router.delete('/super/delete/:id', async (req,res) =>{
  await Super.findByIdAndDelete(req.params.id);
  res.redirect('/super/all')
});


module.exports = router;

