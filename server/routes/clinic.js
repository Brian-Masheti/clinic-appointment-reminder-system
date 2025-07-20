const express = require('express');
const Clinic = require('../models/Clinic');
const Doctor = require('../models/Doctor');
const router = express.Router();

// Create a clinic
router.post('/', async (req, res) => {
  try {
    const { name, address, phone, email, description, doctorId } = req.body;
    const clinic = new Clinic({ name, address, phone, email, description, doctorId });
    await clinic.save();
    // Add clinic to doctor's clinics array
    await Doctor.findByIdAndUpdate(doctorId, { $push: { clinics: clinic._id } });
    res.status(201).json(clinic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update clinic
router.patch('/:id', async (req, res) => {
  try {
    const { name, address, phone, email, description } = req.body;
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      { name, address, phone, email, description },
      { new: true }
    );
    res.json(clinic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Soft delete a clinic
router.patch('/:id/soft-delete', async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    res.json(clinic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List clinics for a doctor
router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const clinics = await Clinic.find({ doctorId: req.params.doctorId });
    res.json(clinics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
