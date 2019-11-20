const mongoose = require('mongoose');
const { Schema } = mongoose;

const bcrypt = require('bcryptjs');

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone : { type: Number, required: true},
  dateU: {type: Date, required: true},
  type: {type: Number, required: true},
  username: {type: String, required:true},
  password: { type: String, required: true }
});

usersSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

usersSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', usersSchema);