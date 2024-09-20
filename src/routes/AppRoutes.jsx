import React, { useContext } from 'react';
import _ from 'lodash';
import { Route, Routes, Navigate } from 'react-router-dom';

// import { AuthContext } from './AuthContext';
// import PrivateRoute from './PrivateRoute';
import { AuthContext } from '../conainers/Authentication/AuthContext';
import ProtectedRoute from '../conainers/Authentication/Login/PrivateRoute';

import routes from './Route';

// import PrivateRoute from '../conainers/Authentication/Login/PrivateRoute';
const renderRoutes = (routes, basePath = '') => {
  const { authToken, logout } = useContext(AuthContext);

  const handleSignout = () => {
    // logout();
    return <Navigate to="/" replace />;
  };
  return _.flatMap(routes, (route) => {
    const fullPath = `${basePath}${route.path || ''}`;
    const subRoutes = route.subRoute ? renderRoutes(route.subRoute, `${fullPath}/`) : null;
    const Element = route.path === '/' ? route.element : <ProtectedRoute element={route.element} />;
    if (route.protected) {
      return [
        <Route
          key={fullPath}
          path={fullPath}
          element={route.protected ? <ProtectedRoute element={route.element} /> : route.element}
        />,
        subRoutes,
      ];
    }

    return [<Route key={fullPath} path={fullPath} element={route.element} />, subRoutes];
  });
};

const AppRoutes = () => {
  return <Routes>{renderRoutes(routes)}</Routes>;
};

export default AppRoutes;
