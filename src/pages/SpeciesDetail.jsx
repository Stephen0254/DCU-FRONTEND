// src/pages/SpeciesDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AdminOnly from '../components/AdminOnly'

const SpeciesDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [species, setSpecies] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id === 'add') return
    const fetchSpecies = async () => {
      try {
        const res = await fetch(`/api/species/${id}`)
        const data = await res.json()
        setSpecies(data)
      } catch (err) {
        setError('Species not found')
      }
    }
    fetchSpecies()
  }, [id])

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this species?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/species/${id}`, { method: 'DELETE' })
      if (res.ok) navigate('/species')
    } catch (err) {
      console.error('Failed to delete species:', err)
    }
  }

  if (!species) return <p className="text-gray-400 px-4 py-10">Loading species...</p>
  if (error) return <p className="text-red-400 px-4 py-10">{error}</p>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-sky-400 mb-4">{species.name}</h1>
      <p className="text-gray-300 mb-4">{species.description}</p>

      {species.imageUrl && (
        <img
          src={species.imageUrl}
          alt={species.name}
          className="rounded-lg max-w-full h-auto mb-6"
        />
      )}

      <AdminOnly>
        <div className="flex space-x-4">
          <Link
            to={`/species/edit/${species._id}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </AdminOnly>
    </div>
  )
}

export default SpeciesDetail
