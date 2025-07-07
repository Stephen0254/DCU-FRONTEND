import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Hide navbar entirely if not logged in
  if (!token) return null;

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-950 to-black border-b border-gray-800 shadow">
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500">
        DESTINY COMICS UNIVERSE
      </h1>

      <div className="flex gap-4">
        <button
          onClick={handleLogout}
          className="nav-btn bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl shadow font-semibold transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
