const mongoose = require('mongoose');
const {Schema } = mongoose;

const productosSchema = new Schema({
    idProducto: {type: Number, required:true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required:true},
    cantidad: {type: Number, required: true}

});
module.exports = mongoose.model("Producto", productosSchema)