// src/Context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  const [token, setToken] = useState(storedToken);
  const [role, setRole] = useState(storedRole);
  const [isAdmin, setIsAdmin] = useState(storedRole === 'admin');

  useEffect(() => {
    setIsAdmin(role === 'admin');
  }, [role]);

  const login = (newToken, userRole) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', userRole);
    setToken(newToken);
    setRole(userRole);
    setIsAdmin(userRole === 'admin');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ token, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Fixes the import error in other files
export const useAuth = () => useContext(AuthContext);
