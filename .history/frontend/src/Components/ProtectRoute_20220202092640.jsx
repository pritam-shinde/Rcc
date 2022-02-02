import React from 'react';
import {useSelector} from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectRoute = () => {
    const {authenticate} = useSelector(state=>state.auth)
  return <>

  </>;
};

export default ProtectRoute;
