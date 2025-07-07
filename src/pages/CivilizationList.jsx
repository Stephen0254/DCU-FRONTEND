import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const CivilizationList = () => {
  const [civilizations, setCivilizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCivilizations = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/civilizations`);
        const data = await res.json();
        setCivilizations(data);
      } catch (err) {
        console.error('Error loading civilizations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCivilizations();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this civilization?');
    if (!confirm) return;

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/civilizations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setCivilizations((prev) => prev.filter((civ) => civ._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        All Civilizations
      </h2>

      {isAdmin && (
        <button
          onClick={() => navigate('/civilizations/add')}
          className="mb-8 px-5 py-2.5 text-sm font-medium rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white transition"
        >
          + Add Civilization
        </button>
      )}

      {loading ? (
        <p className="text-gray-400">Loading civilizations...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {civilizations.map((civ) => {
            const imageUrl = civ.image?.startsWith('/uploads')
              ? `${import.meta.env.VITE_API_BASE_URL}${civ.image}`
              : civ.image;

            return (
              <div
                key={civ._id}
                className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={civ.name}
                    className="w-full h-60 object-cover rounded-xl mb-4 border border-gray-600"
                  />
                )}
                <h3 className="text-xl font-semibold text-white">{civ.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{civ.description || 'No description'}</p>

                {isAdmin && (
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => navigate(`/civilizations/edit/${civ._id}`)}
                      className="px-4 py-1.5 text-sm rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(civ._id)}
                      className="px-4 py-1.5 text-sm rounded-xl bg-red-600 hover:bg-red-500 text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CivilizationList;
