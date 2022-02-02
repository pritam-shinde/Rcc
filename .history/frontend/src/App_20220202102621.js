import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login, Register, Messenger } from './Components/Components'

const App = () => {
  const { authenticate } = useSelector(state => state.auth)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/messenger/login" element={<Login />} />
          <Route path="/messenger/register" element={<Register />} />
          {
            authenticate ? <Route path="/" element={<Messenger />} /> : <Navigate to="/messenger/login" />
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
