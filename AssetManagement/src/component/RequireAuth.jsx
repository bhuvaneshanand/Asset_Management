import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useLocation,Outlet, Navigate } from 'react-router-dom'

export default function RequireAuth() {
    const {auth}=useContext(AuthContext)
    const location=useLocation();
  return (
      auth?.username?<Outlet/>:<Navigate to="/login" state={{from:location}}replace />
  )
}