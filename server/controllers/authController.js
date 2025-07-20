const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    // DO NOT hash password here, let the pre-save hook do it
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    // AUTOMATE: If doctor, create doctor profile
    if (role === 'doctor') {
      await Doctor.create({
        _id: newUser._id,
        name,
        email,
        phone: '',
        address: '',
        speciality: '',
        profilePicture: '',
        clinics: []
      });
    }
    // AUTOMATE: If patient, create patient profile
    if (role === 'patient') {
      await Patient.create({
        userId: newUser._id,
        name,
        email,
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        doctors: []
      });
    }
    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
