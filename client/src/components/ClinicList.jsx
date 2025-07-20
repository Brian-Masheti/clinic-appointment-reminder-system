import React, { useEffect, useState } from 'react';
import { fetchClinics, updateClinic, softDeleteClinic } from '../api';

export default function ClinicList({ doctorId }) {
  const [clinics, setClinics] = useState([]);
  const [editClinic, setEditClinic] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', address: '', phone: '', email: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (doctorId) {
      fetchClinics(doctorId).then(setClinics);
    }
  }, [doctorId]);

  const handleEdit = (clinic) => {
    setEditClinic(clinic);
    setEditForm({
      name: clinic.name || '',
      address: clinic.address || '',
      phone: clinic.phone || '',
      email: clinic.email || '',
      description: clinic.description || '',
    });
    setError('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateClinic(editClinic._id, editForm);
      setEditClinic(null);
      setEditForm({ name: '', address: '', phone: '', email: '', description: '' });
      fetchClinics(doctorId).then(setClinics);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSoftDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this clinic?')) {
      await softDeleteClinic(id);
      fetchClinics(doctorId).then(setClinics);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Your Clinics</h2>
      <ul className="list-disc ml-6">
        {clinics.filter(clinic => !clinic.deleted).map(clinic => (
          <li key={clinic._id} className="mb-4">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-lg">{clinic.name}</div>
              <button title="Edit" className="p-1 text-blue-500 hover:text-blue-700" onClick={() => handleEdit(clinic)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19.5 3 21l1.5-4L16.5 3.5z"/></svg>
              </button>
              <button title="Delete" className="p-1 text-red-500 hover:text-red-700" onClick={() => handleSoftDelete(clinic._id)}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
            <div className="text-gray-700 dark:text-gray-300">{clinic.address}</div>
            <div className="text-gray-700 dark:text-gray-300">Phone: {clinic.phone || '-'}</div>
            <div className="text-gray-700 dark:text-gray-300">Email: {clinic.email || '-'}</div>
            <div className="text-gray-700 dark:text-gray-300">{clinic.description}</div>
          </li>
        ))}
      </ul>
      {editClinic && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Clinic</h3>
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <form onSubmit={handleEditSubmit}>
              <input
                className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Clinic Name"
                value={editForm.name}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
              <input
                className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Address"
                value={editForm.address}
                onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                required
              />
              <input
                className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Phone"
                value={editForm.phone}
                onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                required
              />
              <input
                className="border p-2 mb-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Email"
                value={editForm.email}
                onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
              <textarea
                className="border p-2 mb-4 w-full rounded dark:bg-gray-800 dark:text-gray-100"
                placeholder="Description"
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                rows={2}
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEditClinic(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
