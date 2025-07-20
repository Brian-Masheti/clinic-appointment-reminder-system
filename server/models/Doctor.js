const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  speciality: { type: String },
  profilePicture: { type: String },
  clinics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }],
});

module.exports = mongoose.model('Doctor', doctorSchema);
