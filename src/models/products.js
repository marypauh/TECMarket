const mongoose = require('mongoose');
const {Schema } = mongoose;

const productsSchema = new Schema({
    idProduct: {type: Number, required:true},
    name: {type: String, required: true},
    description: {type: String, required:true},
    quantity: {type: Number, required: true}

});
module.exports = mongoose.model("Product", productsSchema)