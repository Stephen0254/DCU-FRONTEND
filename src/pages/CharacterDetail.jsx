// src/pages/CharacterDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import AdminOnly from '../components/AdminOnly'

const CharacterDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [character, setCharacter] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id === 'add') return
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`/api/characters/${id}`)
        const data = await res.json()
        setCharacter(data)
      } catch (err) {
        setError('Character not found')
      }
    }
    fetchCharacter()
  }, [id])

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this character?')
    if (!confirmed) return

    try {
      const res = await fetch(`/api/characters/${id}`, { method: 'DELETE' })
      if (res.ok) navigate('/characters')
    } catch (err) {
      console.error('Failed to delete character:', err)
    }
  }

  if (!character) return <p className="text-gray-400 px-4 py-10">Loading character...</p>
  if (error) return <p className="text-red-400 px-4 py-10">{error}</p>

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-sky-400 mb-4">{character.name}</h1>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold">Role:</span> {character.role}
      </p>
      <p className="text-gray-300 mb-4">
        <span className="font-semibold">Description:</span> {character.description}
      </p>
      {character.imageUrl && (
        <img
          src={character.imageUrl}
          alt={character.name}
          className="rounded-lg max-w-full h-auto mb-6"
        />
      )}

      <AdminOnly>
        <div className="flex space-x-4">
          <Link
            to={`/characters/edit/${character._id}`}
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

export default CharacterDetail
