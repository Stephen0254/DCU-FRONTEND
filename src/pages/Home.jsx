import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute w-[800px] h-[800px] bg-fuchsia-700 opacity-20 rounded-full blur-3xl animate-pulse -z-10 top-[-200px] left-[-300px]" />
      <div className="absolute w-[600px] h-[600px] bg-indigo-600 opacity-20 rounded-full blur-3xl animate-pulse delay-500 -z-10 bottom-[-200px] right-[-200px]" />

      {/* Glassy Background + Gradient Title */}
      <div className="backdrop-blur-md bg-white/10 px-6 py-4 rounded-xl shadow-xl mb-6 animate-fadeInUp">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text">
          DESTINY COMICS UNIVERSE
        </h1>
      </div>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl text-center mb-10 animate-fadeInUp delay-300">
        Dive into a multiverse of heroes, villains, advanced species, ancient civilizations, and legendary weapons.
      </p>

      {/* Main Banner Image */}
      <img
        src="/DCU2.png"
        alt="Main Universe Banner"
        className="w-full max-w-3xl rounded-2xl shadow-xl mb-10 border border-gray-700 animate-fadeInUp delay-500"
      />

      {/* Login/Signup Buttons */}
      {!token && !showLogin && !showSignup && (
        <div className="flex gap-6 animate-fadeInUp delay-700">
          <button
            onClick={() => {
              setShowLogin(true);
              setShowSignup(false);
            }}
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-400 hover:to-green-600 px-8 py-3 rounded-xl font-bold shadow-lg backdrop-blur-md transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowSignup(true);
              setShowLogin(false);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 px-8 py-3 rounded-xl font-bold shadow-lg backdrop-blur-md transition duration-300 transform hover:scale-105"
          >
            Signup
          </button>
        </div>
      )}

      {/* Login Form */}
      {showLogin && (
        <div className="w-full max-w-md mt-6 animate-fadeInUp delay-1000">
          <LoginForm />
          <button
            onClick={() => setShowLogin(false)}
            className="mt-4 text-sm text-gray-400 hover:text-white underline"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Signup Form */}
      {showSignup && (
        <div className="w-full max-w-md mt-6 animate-fadeInUp delay-1000">
          <SignupForm />
          <button
            onClick={() => setShowSignup(false)}
            className="mt-4 text-sm text-gray-400 hover:text-white underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
