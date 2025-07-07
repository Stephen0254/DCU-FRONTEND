import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/equipment`);
        const data = await res.json();
        setEquipment(data);
      } catch (err) {
        console.error('Error loading equipment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this equipment?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/equipment/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setEquipment((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="px-6 py-10 text-center">
      <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
        All Equipment
      </h2>

      {isAdmin && (
        <button
          onClick={() => navigate('/equipment/add')}
          className="mb-8 px-5 py-2.5 text-sm font-medium rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition"
        >
          + Add Equipment
        </button>
      )}

      {loading ? (
        <p className="text-gray-400">Loading equipment...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {equipment.map((item) => {
            const imageUrl = item.image?.startsWith('/uploads')
              ? `${import.meta.env.VITE_API_BASE_URL}${item.image}`
              : item.image;

            return (
              <div
                key={item._id}
                className="bg-gradient-to-br from-gray-900 to-black p-5 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center"
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-60 object-cover rounded-xl mb-4 border border-gray-600"
                  />
                )}
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {item.description || 'No description'}
                </p>

                {isAdmin && (
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => navigate(`/equipment/edit/${item._id}`)}
                      className="px-4 py-1.5 text-sm rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
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

export default EquipmentList;
