import React from 'react';
import { useSelector } from 'react-redux';

const ProtectRoute = () => {
    const {authenticate} = useSelector(state=> state.auth)
  return <>
{

}
  </>;
};

export default ProtectRoute;

