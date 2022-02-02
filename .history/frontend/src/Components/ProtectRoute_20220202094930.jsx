import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectRoute = ({path, element}) => {
    const { authenticate } = useSelector(state => state.auth);
    authenticate ? <Route path={path} element={element} /> : <Route />
};

export default ProtectRoute;
