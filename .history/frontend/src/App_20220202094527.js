import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register, Messenger } from './Components/Components'

const App = () => {
  const { authenticate } = useSelector(state => state.auth)
  return (
    <>
      <Routes>
        <Route exact path="/messenger/login" element={<Login />} />
        <Route exact path="/messenger/register" element={<Register />} />
        <Route exact path="/" element={<Messenger />} />
        <ProtectRoute />
      </Routes>
    </>
  )
}

export default App
