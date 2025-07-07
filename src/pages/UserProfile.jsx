// src/pages/UserProfile.jsx
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const UserProfile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          My Profile
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading profile...</p>
        ) : user ? (
          <div className="text-white space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-xl font-bold border border-gray-600">
                {user.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{user.email}</h3>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <p>You can expand this page with:</p>
              <ul className="list-disc list-inside ml-2">
                <li>Edit profile</li>
                <li>Change password</li>
                <li>My saved characters</li>
                <li>Favorites</li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">Failed to load user data.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
