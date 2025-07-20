import React, { useState } from 'react';
import { createClinic } from '../api';

export default function ClinicForm({ doctorId, onCreated }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createClinic({ name, address, phone, email, description, doctorId });
      setName('');
      setAddress('');
      setPhone('');
      setEmail('');
      setDescription('');
      if (onCreated) onCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-lg font-bold mb-2">Add Clinic</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <input
        className="border p-2 mr-2 dark:bg-gray-800 dark:text-gray-100"
        placeholder="Clinic Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2 dark:bg-gray-800 dark:text-gray-100"
        placeholder="Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2 dark:bg-gray-800 dark:text-gray-100"
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <input
        className="border p-2 mr-2 dark:bg-gray-800 dark:text-gray-100"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <textarea
        className="border p-2 mr-2 w-full dark:bg-gray-800 dark:text-gray-100"
        placeholder="Description (e.g. Eye clinic, dental, etc.)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={2}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Adding...' : 'Add Clinic'}
      </button>
    </form>
  );
}
