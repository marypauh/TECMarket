const mongoose = require('mongoose');
const {Schema } = mongoose;

const ordersSchema = new Schema({
    idOrder: {type: Number, required:true},
    idProduct: {type: Number, required:true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true},
    dateO: {type: Date, required: true},
    hour: {type: String, required:true},
    state: {type: Number, required: true},
    needs: {type: String, required: false},
});
module.exports = mongoose.model("Order", ordersSchema)