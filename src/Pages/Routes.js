import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import Frontend from './Frontend'
import Auth from './Auth'
import Dashboard from './Dashboard'
import { useAuthContext } from '../Context/AuthContext'
import Frontend from './Frontend'
import PrivateRoute from '../components/PrivateRoute'
import Edit from './Dashboard/Edit'

export default function Index() {
  const {isAuthenticated}=useAuthContext()
  return (
    <>
    <Routes>
        {/* <Route path='/*' element={<Navigate to="/auth/login"/>}/> */}
        <Route path='/*' element={<Frontend />}/>
        <Route path='auth/*' element={!isAuthenticated ?<Auth/> :<Navigate to="/"/> }/>
        <Route path='dashboard/*' element={<PrivateRoute Component={Dashboard} />}/>
        <Route path="/dashboard/profile/edit/:uid" element={<Edit />} />

        
    </Routes>
    </>
  )
}
