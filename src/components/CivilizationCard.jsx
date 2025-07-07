// src/components/CivilizationCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const CivilizationCard = ({ civ }) => {
  return (
    <div className="bg-gradient-to-b from-fuchsia-800 to-purple-900 rounded-xl shadow-md hover:scale-105 transition-transform overflow-hidden">
      <img
        src={civ.imageUrl}
        alt={civ.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{civ.name}</h2>
        <p className="text-sm text-gray-300 italic">Homeworld: {civ.homeworld}</p>
        <Link
          to={`/civilizations/${civ._id}`}
          className="text-cyan-400 text-sm underline mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default CivilizationCard
