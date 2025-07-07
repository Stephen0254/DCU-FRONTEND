import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalSearchBar from '../components/GlobalSearchBar';

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    'Characters',
    'Species',
    'Civilizations',
    'Worlds',
    'Weapons',
    'Equipment'
  ];

  return (
    <div className="min-h-screen px-6 py-10 text-center">
      <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        DESTINY COMICS UNIVERSE
      </h2>

      <p className="text-lg text-gray-400 mb-6">
        Explore this fascinating fictional universe.
      </p>

      {/* 🔍 Global SearchBar with spacing */}
      <div className="mb-10 max-w-xl mx-auto">
        <GlobalSearchBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {sections.map((section) => (
          <div
            key={section}
            className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col gap-4 items-center"
          >
            <h3 className="text-2xl font-semibold text-white">{section}</h3>
            <button
              onClick={() => navigate(`/${section.toLowerCase()}`)}
              className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow"
            >
              View {section}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
