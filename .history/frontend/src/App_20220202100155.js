import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register, Messenger, ProtectRoute } from './Components/Components'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/messenger/login" element={<Login />} />
        <Route path="/messenger/register" element={<Register />} />
        <Route path="/" element={<Messenger />} />
        <ProtectRoute path="/" element={<Messenger />} />
      </Routes>
    </>
  )
}

export default App
