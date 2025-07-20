import React, { useEffect, useState } from 'react';
import { fetchClinics, createAppointment } from '../api';

export default function AppointmentRequestForm({ patientId, onCreated }) {
  const [clinics, setClinics] = useState([]);
  const [clinicId, setClinicId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch all clinics (for demo, fetch for all doctors)
    fetchClinics('').then(setClinics).catch(() => setClinics([]));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createAppointment({ clinicId, patientId, date, time });
      setClinicId('');
      setDate('');
      setTime('');
      setSuccess('Appointment request sent!');
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-bold mb-2">Request Appointment</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <select
        className="border p-2 mr-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
        value={clinicId}
        onChange={e => setClinicId(e.target.value)}
        required
      >
        <option value="">Select Clinic</option>
        {clinics.map(clinic => (
          <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
        ))}
      </select>
      <input
        className="border p-2 mr-2 bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2 bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700"
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Requesting...' : 'Request Appointment'}
      </button>
    </form>
  );
}
