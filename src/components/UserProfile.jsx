// src/pages/UserProfile.jsx
import React from 'react'
import { useAuth } from '../Context/AuthContext'

const UserProfile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-400">
        You are not logged in.
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">User Profile</h2>
      <p className="mb-2"><strong>Email:</strong> {user.email}</p>
      <p className="mb-2"><strong>Role:</strong> {user.role}</p>
    </div>
  )
}

export default UserProfile
