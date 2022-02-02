import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register, Messenger, ProtectRoute } from './Components/Components'

const App = () => {
  const { authenticate } = useSelector(state => state.auth)
  return (
    <>
      <Routes>
        <Route exact path="/messenger/login" element={<Login />} />
        <Route exact path="/messenger/register" element={<Register />} />
        <ProtectRoute path="/" element={<Messenger />}  />
      </Routes>
    </>
  )
}

export default App
