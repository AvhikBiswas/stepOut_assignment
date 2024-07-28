import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  console.log('token', token)
  const isAuthenticated = token !== null;

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
