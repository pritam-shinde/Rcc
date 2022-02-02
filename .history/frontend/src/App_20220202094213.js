import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register, Messenger } from './Components/Components'

const App = () => {
  const { authenticate } = useSelector(state => state.auth)
  return (
    <>
      <Routes>
        {authenticate ? <Route path="/" element={<Messenger />} /> : <Route path="/messenger/login" element={<Login />} /> }
        <Route path="/messenger/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
