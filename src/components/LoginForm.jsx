// src/components/LoginForm.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid email or password');
      const data = await res.json();
      login(data.token, data.role);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-lg border border-gray-700 max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4 text-white text-center">Login</h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 mb-4 bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 mb-6 bg-gray-800 text-white placeholder-gray-400 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
