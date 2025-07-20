import React, { useState, useEffect } from 'react';
import { createAppointment, fetchPatients } from '../api';

export default function AppointmentForm({ doctorId, clinics, patientId, onCreated }) {
  const [clinicId, setClinicId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(patientId || '');
  const [patients, setPatients] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!patientId) {
      fetchPatients(doctorId).then(setPatients).catch(() => setPatients([]));
    }
  }, [patientId, doctorId]);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createAppointment({ clinicId, doctorId, patientId: selectedPatientId, date, time, notes });
      setClinicId('');
      setDate('');
      setTime('');
      setNotes('');
      setSelectedPatientId(patientId || '');
      setSuccess('Appointment scheduled successfully!');
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-bold mb-2">Schedule Appointment</h2>
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
      {!patientId && (
        <select
          className="border p-2 mr-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          value={selectedPatientId}
          onChange={e => setSelectedPatientId(e.target.value)}
          required
        >
          <option value="">Select Patient</option>
          {patients.map(patient => (
            <option key={patient._id} value={patient._id}>{patient.name} ({patient.email})</option>
          ))}
        </select>
      )}
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
      <textarea
        className="border p-2 mr-2 w-full dark:bg-gray-800 dark:text-gray-100"
        placeholder="Notes (optional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={2}
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Scheduling...' : 'Schedule'}
      </button>
    </form>
  );
}
