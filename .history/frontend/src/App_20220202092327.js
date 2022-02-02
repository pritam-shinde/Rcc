import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register, Messenger, ProtectRoute } from './Components/Components'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Messenger />} />
        <Route path="/messenger/login" element={<Login />} />
        <ProtectRoute />
        <Route path="/messenger/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
