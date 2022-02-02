import React from 'react';
import { BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';
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
            authenticate ? <Route path="/" element={<Messenger />} /> : <
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
