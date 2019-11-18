const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const Order = require('../models/orders');


router.post('/orders/new',async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.render('clients/allOrders')
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
    const {IdOrder} = req.body;
    const {IdProduct} = req.body;
    const {Quantity} = req.body;
    const {Price} = req.body;
    const {DateO} = req.body;
    const {Hour} = req.body;
    const {State} = req.body;
    const {Needs} = req.body;

    const order = await Order.findById(req.params.id);
    order.idOrder = IdOrder;
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
  res.redirect('/orders/all')
}); 


module.exports = router;
