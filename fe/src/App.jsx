import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Login from './Pages/Login'
import Instruction from './Pages/Instruction';

import React, { ReactElement } from 'react';

function App() {


  return (
   
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/instruction' element={<Instruction />} />
      </Routes>
      
  
  )
}

export default App
