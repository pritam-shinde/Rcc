import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

const ProtectRoute = (props) => {
    console.log(props)
    const {authenticate} = useSelector(state=> state.auth)
  return <>
{
authenticate ? <Route /> : null
}
  </>;
};

export default ProtectRoute;

