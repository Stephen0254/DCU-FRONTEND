import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const WeaponList = () => {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/weapons`);
        const data = await res.json();
        setWeapons(data);
      } catch (err) {
        console.error('Error loading weapons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeapons();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this weapon?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/weapons/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setWeapons((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">
        All Weapons
      </h2>

      {isAdmin && (
        <button
          onClick={() => navigate('/weapons/add')}
          className="mb-8 px-5 py-2.5 text-sm font-medium rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition"
        >
          + Add Weapon
        </button>
      )}

      {loading ? (
        <p className="text-gray-400">Loading weapons...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {weapons.map((weapon) => {
            const imageUrl = weapon.image?.startsWith('/uploads')
              ? `${import.meta.env.VITE_API_BASE_URL}${weapon.image}`
              : weapon.image;

            return (
              <div
                key={weapon._id}
                className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={weapon.name}
                    className="w-full h-60 object-cover rounded-xl mb-4 border border-gray-600"
                  />
                )}
                <h3 className="text-xl font-semibold text-white">{weapon.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{weapon.description || 'No description'}</p>

                {isAdmin && (
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => navigate(`/weapons/edit/${weapon._id}`)}
                      className="px-4 py-1.5 text-sm rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(weapon._id)}
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

export default WeaponList;
