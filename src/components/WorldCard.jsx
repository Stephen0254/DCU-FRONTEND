// src/components/WorldCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const WorldRealmCard = ({ world }) => {
  return (
    <div className="bg-gradient-to-br from-sky-800 to-gray-900 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
      <img
        src={world.imageUrl}
        alt={world.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-1">{world.name}</h2>
        <p className="text-sm text-sky-300">Location: {world.location}</p>
        <Link
          to={`/worlds/${world._id}`}
          className="text-sm text-sky-400 underline mt-2 inline-block"
        >
          View World/Realm
        </Link>
      </div>
    </div>
  )
}

export default WorldCard
