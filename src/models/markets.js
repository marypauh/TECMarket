const mongoose = require('mongoose');
const {Schema } = mongoose;

const marketsSchema = new Schema({
   name: {type: String, required: true},
   description: {type: String, required:false},
   latitude: {type: String, required: false},
   length: {type: String, required:false},
   direction: {type: String, required: false}
});
module.exports = mongoose.model("Market", marketsSchema)