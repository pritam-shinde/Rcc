import React from 'react';

import { Routes, Route } from 'react-router-dom';

const ProtectRoute = (props) => {
    console.log(props)
    return <>
        <Routes>
            {
                authenticate ? <Route /> : null
            }
        </Routes>

    </>;
};

export default ProtectRoute;

