import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register, Messenger } from './Components/Components'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/messenger/login" element={<Login />} />
        <Route exact path="/messenger/register" element={<Register />} />
        <Route exact path="/" element={<Messenger />} />
      </Routes>
    </>
  )
}

export default App
