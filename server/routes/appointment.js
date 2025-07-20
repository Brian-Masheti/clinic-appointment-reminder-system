const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Create an appointment
router.post('/', async (req, res) => {
  try {
    const { clinicId, doctorId, patientId, date, time, notes } = req.body;
    const appointment = new Appointment({ clinicId, doctorId, patientId, date, time, notes });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all appointments for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.params.doctorId })
      .populate('clinicId patientId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all appointments for a patient
router.get('/patient/:patientId', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.params.patientId })
      .populate('clinicId doctorId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update appointment
router.patch('/:id', async (req, res) => {
  try {
    const { date, time, notes } = req.body;
    const appt = await Appointment.findByIdAndUpdate(
      req.params.id,
      { date, time, notes },
      { new: true }
    );
    res.json(appt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Soft delete an appointment
router.patch('/:id/soft-delete', async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    res.json(appt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
