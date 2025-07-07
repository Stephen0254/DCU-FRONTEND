import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalSearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) return setSuggestions([]);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/search?q=${query}`);
        const data = await res.json();

        const results = [
          ...(data.characters || []),
          ...(data.weapons || []),
          ...(data.species || []),
          ...(data.civilizations || []),
          ...(data.titles || []),
          ...(data.equipment || []),
        ];

        setSuggestions(results);
        setShowDropdown(true);
      } catch (err) {
        console.error('Search error:', err);
        setSuggestions([]);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item.name);          // Show selected name in input
    setShowDropdown(false);       // Close dropdown
    setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(item.name)}`);
    }, 100);                      // Slight delay to allow input update before navigation
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150); // Allow click before hiding
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search characters, species, weapons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={handleBlur}
        className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white"
      />

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-xl max-h-64 overflow-y-auto">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onMouseDown={() => handleSelect(item)}  // ← Fix for clickable selection
              className="px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GlobalSearchBar;
