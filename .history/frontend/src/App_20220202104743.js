import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
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
          <Route path="/" element={<Messenger />} />
          // {
          //   authenticate ? <Route path="/" element={<Messenger />} /> : <Route path="/" element={<Navigate replace to="/messenger/login" />} />
          // }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
