import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRout = ({ children }) => {
  const accessToken = localStorage.getItem("access");

  if (accessToken){
    return <Navigate to="/" replace />;
  }
  return children;
}

export default PublicRout