// src/components/Logout.jsx
import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  return (
    <div className="text-center text-zinc-400 mt-20">
      Logging out...
    </div>
  )
}

export default Logout
