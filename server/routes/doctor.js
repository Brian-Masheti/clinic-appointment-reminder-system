const express = require('express');
const Doctor = require('../models/Doctor');
const Clinic = require('../models/Clinic');
const router = express.Router();

// Create doctor profile
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get doctor profile
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('clinics');
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update doctor profile
router.patch('/:id', async (req, res) => {
  try {
    const { name, email, phone, address, speciality, profilePicture, clinics } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, speciality, profilePicture, clinics },
      { new: true }
    ).populate('clinics');
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
