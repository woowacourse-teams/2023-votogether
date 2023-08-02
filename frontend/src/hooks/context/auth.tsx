import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';

import { LoggedInfo } from '@type/user';

import { useUserLogin } from '@hooks/query/useUser';

import { getCookieToken } from '@utils/cookie';

interface Auth {
  loggedInfo: LoggedInfo;
  setLoggedInfo: Dispatch<SetStateAction<LoggedInfo>>;
}

const notLoggedInfo: LoggedInfo = {
  isLogin: false,
  accessToken: '',
};

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInfo, setLoggedInfo] = useState(notLoggedInfo);
  const { data: userInfo } = useUserLogin(loggedInfo.accessToken);
  if (userInfo) setLoggedInfo(origin => ({ ...origin, userInfo }));

  useEffect(() => {
    const accessToken = getCookieToken().accessToken;
    if (accessToken) setLoggedInfo(origin => ({ ...origin, accessToken }));
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInfo, setLoggedInfo }}>{children}</AuthContext.Provider>
  );
}
