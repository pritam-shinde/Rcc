import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const ProtectRoute = (props) => {
    const { authenticate } = useSelector(state => state.auth)
    return authenticate ? <Route path={props.path} element={props.element} /> : null
};

export default ProtectRoute;
