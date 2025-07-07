// src/pages/WorldList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const WorldList = () => {
  const [worlds, setWorlds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorlds = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/worlds`);
        const data = await res.json();
        setWorlds(data);
      } catch (err) {
        console.error('Error loading worlds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorlds();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Delete this world/realm?');
    if (!confirm) return;

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/worlds/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorlds((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
        All Worlds / Realms
      </h2>

      {isAdmin && (
        <button
          onClick={() => navigate('/worlds/add')}
          className="mb-8 px-5 py-2.5 text-sm font-medium rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition"
        >
          + Add World/Realm
        </button>
      )}

      {loading ? (
        <p className="text-gray-400">Loading worlds...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {worlds.map((w) => {
            const imageUrl = w.image?.startsWith('/uploads')
              ? `${import.meta.env.VITE_API_BASE_URL}${w.image}`
              : w.image;

            return (
              <div
                key={w._id}
                className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={w.name}
                    className="w-full h-60 object-cover rounded-xl mb-4 border border-gray-600"
                  />
                )}
                <h3 className="text-xl font-semibold text-white">{w.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{w.description || 'No description'}</p>

                {isAdmin && (
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => navigate(`/worlds/edit/${w._id}`)}
                      className="px-4 py-1.5 text-sm rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(w._id)}
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

export default WorldList;
