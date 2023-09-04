import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { LoggedInfo } from '@type/user';

import { useUserInfo } from '@hooks/query/user/useUserInfo';

import { clearCookieToken, getCookieToken, decodeToken } from '@utils/cookie';

interface Auth {
  loggedInfo: LoggedInfo;
  setLoggedInfo: Dispatch<SetStateAction<LoggedInfo>>;
  clearLoggedInfo: () => void;
}

const notLoggedInfo: LoggedInfo = {
  isLoggedIn: false,
  accessToken: '',
};

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInfo, setLoggedInfo] = useState(notLoggedInfo);
  const { data: userInfo } = useUserInfo(loggedInfo.isLoggedIn);

  const clearLoggedInfo = () => {
    clearCookieToken('accessToken');
    clearCookieToken('refreshToken');
    localStorage.removeItem('hasEssentialInfo');

    setLoggedInfo(notLoggedInfo);
  };

  useEffect(() => {
    if (userInfo && loggedInfo.isLoggedIn) {
      setLoggedInfo(origin => ({ ...origin, userInfo }));
    }
  }, [loggedInfo.isLoggedIn, userInfo]);

  useEffect(() => {
    const accessToken = getCookieToken().accessToken;
    if (accessToken) {
      const decodedPayload = decodeToken(accessToken);
      const id = decodedPayload.memberId;
      setLoggedInfo(origin => ({ ...origin, accessToken, id, isLoggedIn: true }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInfo, setLoggedInfo, clearLoggedInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
