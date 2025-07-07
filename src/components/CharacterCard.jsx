// src/components/CharacterCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const imageUrl = character.image?.startsWith('/uploads')
    ? `${import.meta.env.VITE_API_BASE_URL}${character.image}`
    : character.image;

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={imageUrl}
        alt={character.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{character.name}</h2>
        <p className="text-sm text-gray-400 italic mb-2">{character.role}</p>
        <Link
          to={`/characters/${character._id}`}
          className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 text-sm underline"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default CharacterCard;
