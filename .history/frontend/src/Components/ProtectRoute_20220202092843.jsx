import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectRoute = ({path}) => {
    const { authenticate } = useSelector(state => state.auth)
    return authenticate ? <Route path={path} />
};

export default ProtectRoute;
