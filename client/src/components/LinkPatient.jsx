import React, { useEffect, useState } from 'react';
import { linkPatientToDoctor } from '../api';

export default function LinkPatient({ doctorId, clinics, onLinked }) {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedClinic, setSelectedClinic] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/patients')
      .then(res => res.json())
      .then(setPatients)
      .catch(() => setPatients([]));
  }, []);

  const handleLink = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await linkPatientToDoctor(selectedPatient, doctorId);
      setSuccess('Patient linked to doctor!');
      setSelectedPatient('');
      setSelectedClinic('');
      onLinked && onLinked();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
      <h3 className="font-bold mb-2">Link Patient to Clinic</h3>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <div className="flex flex-col gap-2 md:flex-row mb-2">
        <select value={selectedPatient} onChange={e => setSelectedPatient(e.target.value)} className="border p-2 rounded w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
          <option value="">{patients.length === 0 ? 'No patients available' : 'Select Patient'}</option>
          {patients.map(p => (
            <option key={p._id} value={p._id}>{p.name} ({p.email})</option>
          ))}
        </select>
        <select value={selectedClinic} onChange={e => setSelectedClinic(e.target.value)} className="border p-2 rounded w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 dark:text-gray-100">
          <option value="">Select Clinic</option>
          {clinics.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleLink}
        disabled={!selectedPatient || !selectedClinic || loading}
      >
        {loading ? 'Linking...' : 'Link Patient to Clinic'}
      </button>
    </div>
  );
}
