// src/pages/EditCivilization.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const EditCivilization = () => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchCivilization = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/civilizations/${id}`);
        const data = await res.json();
        setName(data.name || '');
        setDescription(data.description || '');
        setCurrentImage(`${import.meta.env.VITE_API_BASE_URL}/uploads/${data.image}`);
      } catch (err) {
        alert('Failed to load civilization data.');
      }
    };

    fetchCivilization();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/civilizations/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update civilization');
      navigate('/civilizations');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        Edit Civilization
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-gray-700"
        encType="multipart/form-data"
      >
        <div className="mb-5">
          <label className="block text-left text-sm text-gray-300 mb-1">Civilization Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-left text-sm text-gray-300 mb-1">Description</label>
          <textarea
            className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {currentImage && (
          <div className="mb-5 text-left">
            <p className="text-sm text-gray-400 mb-1">Current Image:</p>
            <img
              src={currentImage}
              alt="Current"
              className="w-full h-60 object-cover rounded-xl border border-gray-600"
            />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-left text-sm text-gray-300 mb-1">New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 text-white bg-gray-800 rounded-xl"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow"
        >
          Update Civilization
        </button>
      </form>
    </div>
  );
};

export default EditCivilization;
