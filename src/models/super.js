const mongoose = require('mongoose');
const {Schema } = mongoose;

const superSchema = new Schema({
   latitud: {type: String, required: false},
   longitud: {type: String, required:false},
   direccion: {type: String, required: false}
});
module.exports = mongoose.model("Super", superSchema)