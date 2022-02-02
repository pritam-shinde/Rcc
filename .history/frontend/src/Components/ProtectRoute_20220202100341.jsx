import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

const ProtectRoute = (props) => {
    console.log(props)
    const { authenticate } = useSelector(state => state.auth)
    return <>
        <Routes>
            {
                authenticate ? <Route /> : null
            }
        </Routes>

    </>;
};

export default ProtectRoute;

