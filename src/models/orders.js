const mongoose = require('mongoose');
const {Schema } = mongoose;

const ordersSchema = new Schema({
    idOrder: {type: Number, required: true },
    market: {type: String , required:true},
    clientUsername: {type: String , required: true},
    products: {type: Array , required: false, default: []},
    quantityProducts : {type: Array, required: false, default: []},
    total: {type: Number, required: true, default: 0},
    dateO: {type: Date, required: true},
    hour: {type: String, required:true},
    state: {type: String, required: true},
    needs: {type: String, required: false},
});
module.exports = mongoose.model("Order", ordersSchema)