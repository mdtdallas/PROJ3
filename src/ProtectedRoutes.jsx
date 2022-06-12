import React from 'react'
import { Outlet } from 'react-router-dom';
import Login from './pages/Login'

const useAuth = () => {
    const userType = localStorage.getItem('userType')
    const admin = userType === 'admin'
    if(!admin) return;
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) return alert('Access Denied!');
    return accessToken
}

export default function ProtectedRoutes() {
    const isAuth = useAuth();
  return isAuth ? <Outlet/> : <Login/>
 }
