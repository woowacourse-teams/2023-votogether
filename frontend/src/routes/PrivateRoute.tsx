import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { PATH } from '@constants/path';

import { getCookieToken } from '@utils/cookie';

interface Route extends PropsWithChildren {
  isAuthenticated?: boolean;
  path?: (typeof PATH)[keyof typeof PATH];
}

const PrivateRoute = ({ children, isAuthenticated = true, path = PATH.LOGIN }: Route) => {
  const isLoggedIn = getCookieToken().accessToken;

  if (!isLoggedIn) {
    alert('해당 페이지에 접근하려면 로그인이 필요합니다.');

    return <Navigate to={path} />;
  }

  if (!isAuthenticated) {
    alert('해당 페이지에 대한 접근 권한이 없습니다.');

    return <Navigate to={path} />;
  }

  return children;
};

export default PrivateRoute;
