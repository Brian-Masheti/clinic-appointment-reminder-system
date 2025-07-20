const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  reminderSent: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
