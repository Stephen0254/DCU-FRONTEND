// src/components/SpeciesCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const SpeciesCard = ({ species }) => {
  return (
    <div className="bg-gradient-to-b from-indigo-800 to-indigo-900 rounded-xl shadow-md hover:scale-105 transition-transform overflow-hidden">
      <img
        src={species.imageUrl}
        alt={species.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{species.name}</h2>
        <p className="text-sm text-gray-300 italic">{species.origin}</p>
        <Link
          to={`/species/${species._id}`}
          className="text-cyan-400 text-sm underline mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default SpeciesCard
