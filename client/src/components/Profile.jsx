import React from 'react';
import { useUser } from '../contexts/UserContext';

export default function Profile() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow text-gray-900 dark:text-gray-100">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
      <div className="mt-4 text-yellow-600 dark:text-yellow-400 font-semibold">More profile features coming soon...</div>
    </div>
  );
}
