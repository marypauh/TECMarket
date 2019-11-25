const mongoose = require('mongoose');
const {Schema } = mongoose;

const productsSchema = new Schema({
    idProduct: {type: Number, required:true},
    name: {type: String, required: true},
    description: {type: String, required:false},
    quantity: {type: Number, required: true},
    price: {type: Number , required: true},
    nameMarket: {type: String, required: false}

});
module.exports = mongoose.model("Product", productsSchema)