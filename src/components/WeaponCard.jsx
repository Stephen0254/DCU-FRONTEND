// src/components/WeaponCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const WeaponCard = ({ weapon }) => {
  return (
    <div className="bg-gradient-to-b from-red-800 to-red-950 rounded-xl shadow-md hover:scale-105 transition-transform overflow-hidden">
      <img
        src={weapon.imageUrl}
        alt={weapon.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{weapon.name}</h2>
        <p className="text-sm text-gray-300 italic">Type: {weapon.type}</p>
        <Link
          to={`/weapons/${weapon._id}`}
          className="text-red-400 text-sm underline mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default WeaponCard
