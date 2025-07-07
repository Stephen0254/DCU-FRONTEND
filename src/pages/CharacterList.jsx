// src/pages/CharacterList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import AdminOnly from '../components/AdminOnly';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`);
        const data = await res.json();
        setCharacters(data);
      } catch (err) {
        console.error('Failed to fetch characters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this character?');
    if (!confirm) return;

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCharacters((prev) => prev.filter((char) => char._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        All Characters
      </h2>

      {/* ✅ Admin-only Add button */}
      <AdminOnly>
        <div className="mb-6">
          <button
            onClick={() => navigate('/characters/add')}
            className="px-5 py-2 text-sm font-medium rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white"
          >
            + Add Character
          </button>
        </div>
      </AdminOnly>

      {loading ? (
        <p className="text-gray-400">Loading characters...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {characters.map((char) => {
            const imageUrl = char.image?.startsWith('/uploads')
              ? `${import.meta.env.VITE_API_BASE_URL}${char.image}`
              : char.image;

            return (
              <div
                key={char._id}
                className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={char.name}
                    className="w-full h-60 object-cover rounded-xl mb-4 border border-gray-600"
                  />
                )}
                <h3 className="text-xl font-semibold text-white">{char.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{char.role || 'No role assigned'}</p>

                {isAdmin && (
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => navigate(`/characters/edit/${char._id}`)}
                      className="px-4 py-1.5 text-sm rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(char._id)}
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

export default CharacterList;
