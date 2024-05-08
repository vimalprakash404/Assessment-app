import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import  AdminLogin from './Pages/admin/Login';
import Instruction from './Pages/Instruction';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { ReactElement } from 'react';
import DashBoard from './Pages/admin/DashBoard';

function App() {


  return (
   
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Instruction' element={<Instruction />} />
        <Route path='/Dashboard' element={<DashBoard />} />
        <Route path="/Admin" element ={<AdminLogin/>}/>
      </Routes>
      
  
  )
}

export default App
