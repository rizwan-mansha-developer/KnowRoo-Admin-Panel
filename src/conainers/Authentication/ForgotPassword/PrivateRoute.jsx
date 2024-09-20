import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
// import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { authToken } = useContext(AuthContext);

  return authToken ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
