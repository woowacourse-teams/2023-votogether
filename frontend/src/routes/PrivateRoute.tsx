import { PropsWithChildren } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { PATH } from '@constants/path';

import { getCookieToken } from '@utils/cookie';

interface Route extends PropsWithChildren {
  isAuthenticated?: boolean;
  path?: (typeof PATH)[keyof typeof PATH];
}

const PrivateRoute = ({ children, isAuthenticated = true, path = PATH.LOGIN }: Route) => {
  const location = useLocation();
  const isLoggedIn = getCookieToken().accessToken;

  if (!isLoggedIn || !isAuthenticated)
    return <Navigate to={path} state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
