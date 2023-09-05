import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';

import { PATH } from '@constants/path';

import { getCookieToken } from '@utils/cookie';

interface Route extends PropsWithChildren {
  isGuestAllowed?: boolean;
  path?: (typeof PATH)[keyof typeof PATH];
}

const PrivateRoute = ({ children, isGuestAllowed = false, path = PATH.LOGIN }: Route) => {
  const authInfo = useContext(AuthContext);
  const isLoggedIn = getCookieToken().accessToken;
  const hasEssentialInfo = getCookieToken().hasEssentialInfo;

  // const isAuthenticated = true;
  if (!isGuestAllowed && !isLoggedIn) {
    alert('해당 페이지에 접근하려면 로그인이 필요합니다.');

    return <Navigate to={path} />;
  }

  /*
  if (!isGuestAllowed && !isAuthenticated) {
    alert('해당 페이지에 대한 접근 권한이 없습니다.');

    return <Navigate to={path} />;
  }
  */

  if (isLoggedIn && hasEssentialInfo === 'false') {
    alert('개인정보를 먼저 등록해주세요.');

    return <Navigate to={PATH.USER_INFO_REGISTER} />;
  }

  if (isLoggedIn && hasEssentialInfo === undefined) {
    authInfo.clearLoggedInfo();

    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
