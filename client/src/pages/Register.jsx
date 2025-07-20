import React, { useState } from 'react';

export default function Register({ onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
      const res = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      // If doctor, create doctor profile in doctors collection
      if (role === 'doctor' && data.user && data.user._id) {
        await fetch(`${apiBase}/doctors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: data.user._id,
            name,
            email,
            phone: '',
            address: '',
            speciality: '',
            profilePicture: '',
            clinics: []
          })
        });
      }
      if (role === 'patient' && data.user && data.user._id) {
        await fetch(`${apiBase}/patients`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: data.user._id,
            name,
            email,
            phone: '',
            address: '',
            dateOfBirth: '',
            gender: '',
            doctors: []
          })
        });
      }
      setSuccess('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setRole('doctor');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Register</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success ? (
          <>
            <div className="text-green-600 mb-2">{success}</div>
            <button
              type="button"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded mb-2"
              onClick={onSwitchToLogin}
            >
              OK
            </button>
          </>
        ) : (
          <>
            <input
              className="border p-2 mb-2 w-full rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              className="border p-2 mb-2 w-full rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              className="border p-2 mb-2 w-full rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <select
              className="border p-2 mb-4 w-full rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="doctor">Doctor</option>
              <option value="patient">Patient</option>
              <option value="admin">Super Admin</option>
            </select>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full mb-2"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <button
              type="button"
              className="w-full text-blue-500 hover:underline"
              onClick={onSwitchToLogin}
            >
              Already have an account? Login
            </button>
          </>
        )}
      </form>
    </div>
  );
}
