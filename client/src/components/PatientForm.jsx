import React, { useState } from 'react';
import { createPatient } from '../api';
import { useUser } from '../contexts/UserContext';

export default function PatientForm({ doctorId, onCreated }) {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createPatient({ name, email, phone, doctorId, userId: user?.id, doctors: [doctorId] });
      setName('');
      setEmail('');
      setPhone('');
      setSuccess('Patient created and linked!');
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
      <div className="flex flex-col w-full md:w-auto">
        <h2 className="text-lg font-bold mb-2">Add Patient</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
      </div>
      <input
        className="border p-2 w-full md:w-auto dark:bg-gray-800 dark:text-gray-100"
        placeholder="Patient Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full md:w-auto dark:bg-gray-800 dark:text-gray-100"
        placeholder="Patient Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="border p-2 w-full md:w-auto dark:bg-gray-800 dark:text-gray-100"
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto" disabled={loading}>
        {loading ? 'Adding...' : 'Add Patient'}
      </button>
    </form>
  );
}
