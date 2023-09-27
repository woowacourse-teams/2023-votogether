import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { LoggedInfo } from '@type/user';

import { useUserInfo } from '@hooks/query/user/useUserInfo';

import { logoutUser } from '@api/userInfo';

import { ACCESS_TOKEN_KEY } from '@constants/localStorage';

import { clearCookie } from '@utils/cookie';
import { getLocalStorage, removeLocalStorage } from '@utils/localStorage';
import { decodeToken } from '@utils/login/decodeToken';

interface Auth {
  loggedInfo: LoggedInfo;
  setLoggedInfo: Dispatch<SetStateAction<LoggedInfo>>;
  clearLoggedInfo: () => void;
}

const notLoggedInfo: LoggedInfo = {
  isLoggedIn: false,
};

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInfo, setLoggedInfo] = useState(notLoggedInfo);
  const { data: userInfo } = useUserInfo(loggedInfo.isLoggedIn);

  const clearLoggedInfo = () => {
    removeLocalStorage(ACCESS_TOKEN_KEY);
    clearCookie('hasEssentialInfo');
    logoutUser();

    setLoggedInfo(notLoggedInfo);
  };

  useEffect(() => {
    if (userInfo && loggedInfo.isLoggedIn) {
      setLoggedInfo(origin => ({ ...origin, userInfo }));
    }
  }, [loggedInfo.isLoggedIn, userInfo]);

  useEffect(() => {
    const accessToken = getLocalStorage<string>(ACCESS_TOKEN_KEY);

    if (accessToken) {
      const decodedPayload = decodeToken(accessToken);
      const id = decodedPayload.memberId;
      setLoggedInfo(origin => ({ ...origin, id, isLoggedIn: true }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInfo, setLoggedInfo, clearLoggedInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
