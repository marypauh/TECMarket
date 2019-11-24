const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const Order = require('../models/orders');
const Markets = require('../models/markets');
const Products = require('../models/products');

var idOrderGlobal = 0;


router.post('/orders/new',async (req, res) => {
  const {Market} = req.body;
  const {username} = req.body;
  const {dateO} = req.body;
  const {hour} = req.body;
  const {state} = req.body;
  const {needs} = req.body;
  const {idOrd} = req.body;

  const newOrder = new Order();
  newOrder.idOrder = idOrd;
  newOrder.clientUsername = username;
  newOrder.market = Market;
  newOrder.dateO = dateO;
  newOrder.hour = hour;
  newOrder.state = state;
  newOrder.needs = needs;
  
  idOrderGlobal = idOrd
  const products = await Products.find();
  //await newOrder.save();
  res.render('/Users/raquelrojas/Desktop/GitHub/TECMarket/src/views/orders/addProducts', {products});
});


router.get('/orders/all', async (req, res) => {
  const orders = await Order.find();
  res.render('clients/allOrders', {orders});
});

router.get('/orders/create',(req, res) => {
    res.render('clients/createOrders');
});


router.get('/orders/edit/:id', async (req,res) => {
  const order = await Order.findById(req.params.id);
  res.render('clients/editOrders',{order});
});

  router.put('/orders/edit-order/:id', async (req, res) => {
    const {idOrder} = req.body;
    const {IdProduct} = req.body;
    const {Quantity} = req.body;
    const {Price} = req.body;
    const {DateO} = req.body;
    const {Hour} = req.body;
    const {State} = req.body;
    const {Needs} = req.body;

    const order = await Order.findById(req.params.id);
    order.idOrder = idOrder;
    order.idProduct = IdProduct;
    order.quantity = Quantity;
    order.price = Price;
    order.dateO = DateO;
    order.hour = Hour;
    order.state = State;
    order.needs = Needs;

 await order.save();
 res.redirect('/orders/all')
});

router.delete('/order/delete/:id', async (req,res) =>{
  await Order.findByIdAndDelete(req.params.id);
  res.redirect('orders/all')
}); 

router.get('/orders/selectMarket', async (req, res) => {
  const markets = await Markets.find();
  console.log(markets);
  res.render('orders/selectM', {markets});
});

router.get('/orderDetail/:id',async (req, res) => {
  //console.log(req.param.id);
  const market = await Markets.findById(req.params.id);
 res.render('orders/orderDetail',{market});
});

router.get('/orders/addP',async (req, res) => {
  //const order = await Order.findById(req.params.id);
  console.log(idOrderGlobal);
  //const {idOrd} = req.body;
  //const IdProduct = 123;
  //const quantity = 2;

  //const newOrder = await Order.findOne({idOrder : idOrd});
  //const product = await Products.findOne({idProduct: IdProduct});
  //console.log(newOrder); 
  //console.log(idOrd);
  //console.log(product);
  //console.log(newOrder);
  //newOrder.products.push(IdProduct);
  //newOrder.quantityProducts.push(quantity);
  //const priceP = product.price;
  //const totalP = newOrder.total;
  //const totalOrder = totalP + (priceP * quantity);
  //newOrder.total = totalOrder;
  //product.quantity = product.quantity - quantity;

  //console.log(product);
  //console.log(newOrder);

  //await Order.save();
  //await Product.save();
 //res.render('orders/addProducts',{newOrder});
});

module.exports = router;
