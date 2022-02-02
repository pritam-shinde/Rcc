import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';
import { Login, Messenger } from './Components';

const ProtectRoute = ({path, element}) => {
    const { authenticate } = useSelector(state => state.auth);
    authenticate ? <Route path={path} element={<Messenger/>} /> : <Route path="/messenger/login" element={<Login />} />
};

export default ProtectRoute;
