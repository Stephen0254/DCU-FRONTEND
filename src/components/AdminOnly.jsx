// src/components/AdminOnly.jsx
import React from 'react';
import { useAuth } from '../Context/AuthContext'; // ✅ Use the custom hook

const AdminOnly = ({ children }) => {
  const { isAdmin } = useAuth(); // ✅ Pull isAdmin instead of user

  return isAdmin ? <>{children}</> : null;
};

export default AdminOnly;
