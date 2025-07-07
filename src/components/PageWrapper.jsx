// src/components/PageWrapper.jsx
import React from 'react'

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans px-4">
      <div className="max-w-7xl mx-auto py-8">{children}</div>
    </div>
  )
}

export default PageWrapper
