// src/pages/SearchPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search).get('q');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error('Failed to fetch search results');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error('Search failed:', err);
        setError('Search request failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const renderSection = (title, items, baseRoute) => {
    if (!items?.length) return null;

    return (
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
          {title}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const imageUrl = item.image?.startsWith('/uploads')
              ? `${import.meta.env.VITE_API_BASE_URL}${item.image}`
              : item.image || item.imageUrl;

            return (
              <div
                key={item._id}
                onClick={() => navigate(`/${baseRoute}/detail/${item._id}`)}
                className="cursor-pointer bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 border border-gray-700 hover:shadow-lg transition"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-600"
                  />
                )}
                <h4 className="text-white text-lg font-bold">{item.name}</h4>
                <p className="text-sm text-gray-400 truncate">
                  {item.description || item.role || 'No description available.'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const noResults =
    !loading &&
    !error &&
    Object.values(results).every((section) => !section || section.length === 0);

  return (
    <div className="px-6 py-10 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Search Results for: <span className="underline">{query}</span>
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Searching...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : noResults ? (
        <p className="text-center text-gray-500 italic">No results found for "<strong>{query}</strong>".</p>
      ) : (
        <>
          {renderSection('Characters', results.characters, 'characters')}
          {renderSection('Species', results.species, 'species')}
          {renderSection('Weapons', results.weapons, 'weapons')}
          {renderSection('Equipment', results.equipment, 'equipment')}
          {renderSection('Civilizations', results.civilizations, 'civilizations')}
          {renderSection('Worlds / Realms', results.worlds, 'worlds')}
        </>
      )}
    </div>
  );
};

export default SearchPage;
