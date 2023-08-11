import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@constants/path';

import { getCookieToken } from '@utils/cookie';

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const isLoggedIn = getCookieToken().accessToken;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN);
    }
  }, [isLoggedIn, navigate]);

  return children;
};

export default PrivateRoute;
