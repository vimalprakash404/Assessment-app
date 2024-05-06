import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import Instruction from './Pages/Instruction';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { ReactElement } from 'react';
import DashBoard from './Pages/admin/DashBoard';

function App() {


  return (
   
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/instruction' element={<Instruction />} />
        <Route path='/Dashboard' element={<DashBoard />} />
      </Routes>
      
  
  )
}

export default App
