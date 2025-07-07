// src/pages/AddCivilization.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const AddCivilization = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) return alert('All fields are required.');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/civilizations`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to add civilization');
      navigate('/civilizations');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
        Add New Civilization
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

        <div className="mb-6">
          <label className="block text-left text-sm text-gray-300 mb-1">Civilization Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 text-white bg-gray-800 rounded-xl"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow"
        >
          Add Civilization
        </button>
      </form>
    </div>
  );
};

export default AddCivilization;
