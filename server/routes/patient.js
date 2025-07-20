const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// Create patient profile
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all patients for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const patients = await Patient.find({ doctors: req.params.doctorId });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all patients (super admin only, otherwise forbidden)
router.get('/', async (req, res) => {
  // Example: check for admin role in query or headers (in real app, use auth middleware)
  const isAdmin = req.query.admin === 'true' || req.headers['x-admin'] === 'true';
  if (!isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Link a patient to a doctor
router.patch('/:id/link-doctor', async (req, res) => {
  try {
    const { doctorId } = req.body;
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { doctors: doctorId } },
      { new: true }
    );
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
