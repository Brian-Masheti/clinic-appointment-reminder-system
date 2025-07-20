const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  dateOfBirth: { type: String },
  gender: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Patient', patientSchema);
