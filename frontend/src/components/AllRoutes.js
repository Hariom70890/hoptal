import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'


const AllRoutes = () => {
  return (
    <Routes >
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        {/* <Route path='/signup' element={<Signup/>}/> */}
        
    </Routes>
  )
}

export default AllRoutes