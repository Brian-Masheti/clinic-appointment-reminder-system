import React, { useEffect, useState } from 'react';
import { fetchClinics } from '../api';

export default function DoctorProfile({ doctorId }) {
  // Doctor profile coming soon placeholder
  return (
    <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-900 p-6 rounded shadow text-yellow-600 dark:text-yellow-400 text-center text-lg font-semibold">
      Doctor profile features coming soon...
    </div>
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleClinicChange = e => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value);
    setForm(f => ({ ...f, clinics: options }));
  };

  const handleProfilePicChange = e => {
    setProfilePicFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    let profilePictureUrl = form.profilePicture;
    if (profilePicFile) {
      // Simulate upload, in real app use a file upload API
      profilePictureUrl = URL.createObjectURL(profilePicFile);
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'}/doctors/${doctorId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, profilePicture: profilePictureUrl }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to update profile');
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
      <div className="text-gray-500">Loading profile...</div>
    </div>
  );
  if (error) return (
    <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-900 p-6 rounded shadow text-red-600">
      {error}
    </div>
  );

  // Profile completion calculation
  const totalFields = 6; // name, email, phone, address, speciality, clinics
  let filled = 0;
  if (form.name) filled++;
  if (form.email) filled++;
  if (form.phone) filled++;
  if (form.address) filled++;
  if (form.speciality) filled++;
  if (form.clinics && form.clinics.length > 0) filled++;
  const percent = Math.round((filled / totalFields) * 100);

  return (
    <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-900 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-700 dark:text-gray-300">Profile is {percent}% complete</span>
          <div className="flex-1 h-2 bg-gray-300 dark:bg-gray-700 rounded">
            <div style={{ width: percent + '%' }} className={`h-2 rounded ${percent === 100 ? 'bg-green-500' : 'bg-blue-500'}`}></div>
          </div>
        </div>
        {percent < 100 && <div className="text-xs text-yellow-600 dark:text-yellow-400">Please complete your profile to access all features.</div>}
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-center">
          <img
            src={profilePicFile ? URL.createObjectURL(profilePicFile) : form.profilePicture || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(form.name)}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2 border"
          />
          <input type="file" accept="image/*" onChange={handleProfilePicChange} />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Speciality</label>
          <input name="speciality" value={form.speciality} onChange={handleChange} className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100" required />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Clinics</label>
          <select
            name="clinics"
            multiple
            value={form.clinics}
            onChange={handleClinicChange}
            className="border p-2 w-full rounded dark:bg-gray-800 dark:text-gray-100"
          >
            {clinics.map(clinic => (
              <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
