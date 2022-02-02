import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register, Messenger, ProtectRoute } from './Components/Components'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/messenger/login" element={<Login />} />
        <Route path="/messenger/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
