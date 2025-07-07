// src/pages/WorldRealmDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const WorldRealmDetail = () => {
  const { id } = useParams()
  const [world, setWorld] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorld = async () => {
      try {
        const res = await fetch(`/api/worlds/${id}`)
        const data = await res.json()
        setWorld(data)
      } catch (err) {
        console.error('Failed to load World:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWorld()
  }, [id])

  if (loading) {
    return <p className="text-center text-gray-400">Loading World/Realm...</p>
  }

  if (!world) {
    return <p className="text-center text-red-400">World/Realm not found.</p>
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-gray-900 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={world.imageUrl}
          alt={world.name}
          className="w-full md:w-1/3 h-auto rounded-lg object-cover"
        />
        <div className="flex-1 text-white">
          <h1 className="text-4xl font-bold mb-2">{world.name}</h1>
          <p className="text-sky-400 italic mb-4">Location: {world.location}</p>
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {world.description}
          </p>
          <Link
            to={`/worlds/edit/${world._id}`}
            className="inline-block mt-6 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Edit World / Realm
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WorldDetail
