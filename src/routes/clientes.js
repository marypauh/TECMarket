const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const Pedido = require('../models/pedidos');


router.post('/pedidos/nuevo',async (req, res) => {
  const nuevoPedido = new Pedido(req.body);
  await nuevoPedido.save();
  res.render('clientes/allPedidos')
});


router.get('/pedidos/all', async (req, res) => {
  const pedidos = await Pedido.find();
  res.render('clientes/allPedidos', {pedidos});
});

router.get('/pedidos/create',(req, res) => {
    res.render('clientes/createPedido');
});


router.get('/pedidos/edit/:id', async (req,res) => {
  const pedido = await Pedido.findById(req.params.id);
  res.render('clientes/editPedido',{pedido});
});

  router.put('/pedidos/edit-pedido/:id', async (req, res) => {
    const {IdPedido} = req.body;
    const {IdProducto} = req.body;
    const {Cantidad} = req.body;
    const {Precio} = req.body;
    const {Fecha} = req.body;
    const {Hora} = req.body;
    const {Estado} = req.body;
    const {Necesidades} = req.body;

    const pedido = await Pedido.findById(req.params.id);
    pedido.idPedido = IdPedido;
    pedido.idProducto = IdProducto;
    pedido.cantidad = Cantidad;
    pedido.precio = Precio;
    pedido.fecha = Fecha;
    pedido.hora = Hora;
    pedido.estado = Estado;
    pedido.necesidades = Necesidades;

 await pedido.save();
 res.redirect('/pedidos/all')
});

router.delete('/pedido/delete/:id', async (req,res) =>{
  await Pedido.findByIdAndDelete(req.params.id);
  res.redirect('/pedidos/all')
}); 


module.exports = router;
