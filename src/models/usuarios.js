const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const usuarioSchema = new Schema({
  cedula: { type: Number, required:true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono : { type: Number, required: true},
  fecha: {type: Date, required: true},
  tipo: {type: Number, required: true},
  usuario: {type: String, required:true},
  password: { type: String, required: true }
});

usuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

usuarioSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);