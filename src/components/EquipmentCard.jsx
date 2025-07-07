// src/components/EquipmentCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const EquipmentCard = ({ equipment }) => {
  return (
    <div className="bg-gradient-to-b from-indigo-800 to-indigo-950 rounded-xl shadow-md hover:scale-105 transition-transform overflow-hidden">
      <img
        src={equipment.imageUrl}
        alt={equipment.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{equipment.name}</h2>
        <p className="text-sm text-gray-300 italic">Type: {equipment.type}</p>
        <Link
          to={`/equipment/${equipment._id}`}
          className="text-indigo-300 text-sm underline mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default EquipmentCard
