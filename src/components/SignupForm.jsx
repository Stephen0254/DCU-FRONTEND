// src/components/SignupForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // default role
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Signup failed');
      }

      const data = await res.json();
      login(data.token, data.role === 'admin' ? 'admin' : 'user');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-lg border border-gray-700 max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4 text-white text-center">Sign Up</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-4 bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-2 mb-6 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full py-2 bg-pink-600 hover:bg-pink-500 rounded-xl text-white font-semibold transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
