import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';

import { ACCESS_TOKEN_KEY } from '@constants/localStorage';
import { PATH } from '@constants/path';

import { getCookie } from '@utils/cookie';
import { getLocalStorage } from '@utils/localStorage';

interface Route extends PropsWithChildren {
  isGuestAllowed?: boolean;
  isOnlyAdminAllowed?: boolean;
  path?: (typeof PATH)[keyof typeof PATH];
}

const PrivateRoute = ({
  children,
  isGuestAllowed = false,
  isOnlyAdminAllowed = false,
  path = PATH.LOGIN,
}: Route) => {
  const {
    clearLoggedInfo,
    loggedInfo: { userInfo },
  } = useContext(AuthContext);
  const isLoggedIn = getLocalStorage(ACCESS_TOKEN_KEY);
  const hasEssentialInfo = getCookie().hasEssentialInfo;

  if (isOnlyAdminAllowed && userInfo?.role !== 'ADMIN') {
    alert('해당 페이지는 관리자만 접근이 가능합니다. 마이 페이지를 통해 접속해주세요.');

    return <Navigate to={PATH.USER_INFO} />;
  }

  if (!isGuestAllowed && !isLoggedIn) {
    alert('해당 페이지에 접근하려면 로그인이 필요합니다.');

    return <Navigate to={path} />;
  }

  if (isLoggedIn && hasEssentialInfo === 'false') {
    alert('개인정보를 먼저 등록해주세요.');

    return <Navigate to={PATH.USER_INFO_REGISTER} />;
  }

  if (isLoggedIn && hasEssentialInfo === undefined) {
    clearLoggedInfo();

    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
