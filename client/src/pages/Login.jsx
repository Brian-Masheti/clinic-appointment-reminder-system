import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import getApiBase from '../utils/getApiBase';

function Login({ onSwitchToRegister }) {
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const API_BASE = getApiBase();
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      login(data.user, data.token);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          className="border p-2 mb-2 w-full rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 mb-4 w-full rounded text-gray-900 dark:bg-gray-800 dark:text-gray-100"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className="w-full text-blue-500 hover:underline mt-2"
          onClick={onSwitchToRegister}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
}

export default Login;
