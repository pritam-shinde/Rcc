import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectRoute = (props) => {
    const { authenticate } = useSelector(state => state.auth)
    return authenticate ? <Route path={props.path} element={props.element} /> : <Redirect to="/messenger/login" />
};

export default ProtectRoute;
