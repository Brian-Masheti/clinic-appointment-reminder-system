require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(helmet());
app.use(morgan('combined'));

// Only allow requests from these origins (for security, do NOT use '*')
const allowedOrigins = [
  'http://localhost:5173', // Development Env.
  'http://192.168.100.7:5173', // Development Env.
  'https://clinic-appointment-reminder-system.vercel.app' // Production Env.
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow Postman/curl (no Origin header) and only allow browser requests from allowedOrigins
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'content-type,authorization',
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clinics', require('./routes/clinic'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/patients', require('./routes/patient'));
app.use('/api/doctors', require('./routes/doctor'));

app.get('/', (req, res) => {
  res.send('Clinic Appointment & Reminder System API');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
