import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { LoggedInfo } from '@type/user';

import { useUserInfo } from '@hooks/query/user/useUserInfo';

import { getCookieToken } from '@utils/cookie';

interface Auth {
  loggedInfo: LoggedInfo;
  setLoggedInfo: Dispatch<SetStateAction<LoggedInfo>>;
  clearLoggedInfo: () => void;
}

const notLoggedInfo: LoggedInfo = {
  isLogged: false,
  accessToken: '',
};

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInfo, setLoggedInfo] = useState(notLoggedInfo);
  const { data: userInfo } = useUserInfo(loggedInfo.isLogged);

  const clearLoggedInfo = () => {
    setLoggedInfo(notLoggedInfo);
  };

  useEffect(() => {
    if (userInfo && loggedInfo.isLogged) {
      setLoggedInfo(origin => ({ ...origin, userInfo }));
    }
  }, [userInfo]);

  useEffect(() => {
    const accessToken = getCookieToken().accessToken;
    if (accessToken) setLoggedInfo(origin => ({ ...origin, accessToken, isLogged: true }));
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInfo, setLoggedInfo, clearLoggedInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
