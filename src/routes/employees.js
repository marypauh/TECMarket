const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;


const Product = require('../models/products');
const Market =  require('../models/markets');

router.get('/employeeM', (req,res) =>{
  res.render('employeeM');
});


router.post('/products/new',async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect('/products/create');
});


router.get('/products/all', async (req, res) => {
  const products = await Product.find().sort({date: 'desc'});
  res.render('employees/products/allProducts', { products });
});

router.get('/products/create',(req, res) => {
    res.render('employees/products/createProducts');
});


router.get('/products/edit/:id', async (req,res) => {
  const product = await Product.findById(req.params.id);
  res.render('employees/products/editProducts',{product});
});

router.put('/products/edit-product/:id', async (req, res) => {
 const {IdProduct} = req.body;
 const {Name} = req.body;
 const {Description} = req.body;
 const {Quantity} = req.body;
 const {Price} = req.body;
 const {NameMarket} = req.body;

 const product = await Product.findById(req.params.id);
  product.idProduct = IdProduct;
  product.name =  Name;
  product.description = Description;
  product.quantity = Quantity;
  product.price = Price;
  product.nameMarket = NameMarket;

 await product.save();
 res.redirect('/products/all')
});

router.delete('/product/delete/:id', async (req,res) =>{
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products/all')
});


//Market


router.post('/markets/new',async (req, res) => {
  const newMarket = new Market(req.body);
  await newMarket.save();
  res.redirect('/products/create');
});


router.get('/markets/all', async (req, res) => {
  const markets = await Market.find().sort({date: 'desc'});
  res.render('employees/markets/allMarkets', {markets});
});

router.get('/markets/create',(req, res) => {
    res.render('employees/markets/createMarkets');
});


router.get('/markets/edit/:id', async (req,res) => {
  const markets = await Market.findById(req.params.id);
  res.render('employees/markets/editMarkets',{markets});
});

router.put('/markets/edit-market/:id', async (req, res) => {
  const {Name} = req.body;
  const {Description} = req.body; 
 const {Latitude} = req.body;
 const {Length} = req.body;
 const {Direction} = req.body;

 const markets = await Market.findById(req.params.id);
  markets.latitude = Latitude;
  markets.length = Length;
  markets.direction = Direction;

 await markets.save();
 res.redirect('/markets/all')
});

router.delete('/markets/delete/:id', async (req,res) =>{
  await Market.findByIdAndDelete(req.params.id);
  res.redirect('/markets/all')
});


module.exports = router;

