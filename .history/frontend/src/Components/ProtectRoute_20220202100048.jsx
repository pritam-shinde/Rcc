import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const ProtectRoute = () => {
    const {authenticate} = useSelector(state=> state.auth)
  return <>
{
authenticate ? <Route />
}
  </>;
};

export default ProtectRoute;

