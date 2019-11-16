const mongoose = require('mongoose');
const {Schema } = mongoose;

const pedidosSchema = new Schema({
    idPedido: {type: Number, required:true},
    idProducto: {type: Number, required:true},
    cantidad: {type: Number, required: true},
    precio: {type: Number, required: true},
    fecha: {type: Date, required: true},
    hora: {type: String, required:true},
    estado: {type: Number, required: true},
    necesidades: {type: String, required: false},
});
module.exports = mongoose.model("Pedido", pedidosSchema)