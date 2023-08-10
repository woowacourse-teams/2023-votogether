import React, { PropsWithChildren, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';

import { PATH } from '@constants/path';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { loggedInfo } = useContext(AuthContext);
  const location = useLocation();

  if (!loggedInfo.isLoggedIn) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
