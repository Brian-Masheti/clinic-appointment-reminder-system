// setup-test-db.js
// Script to initialize/reset the test database for integration tests
require('dotenv').config();
const mongoose = require('mongoose');

const TEST_DB_URI = process.env.TEST_DB_URI || 'mongodb://localhost:27017/clinic_test';

async function setupTestDB() {
  try {
    await mongoose.connect(TEST_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoose.connection.dropDatabase();
    console.log('Test database initialized/reset at', TEST_DB_URI);
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Failed to setup test DB:', err);
    process.exit(1);
  }
}

setupTestDB();
