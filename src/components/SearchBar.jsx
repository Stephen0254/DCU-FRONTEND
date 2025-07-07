// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-4 py-2 rounded-2xl shadow-lg max-w-xl mx-auto mb-12"
    >
      <input
        type="text"
        placeholder="Search characters, species, civilizations..."
        className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
