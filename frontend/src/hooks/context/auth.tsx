import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

import { UserInfoResponse } from '@type/user';

interface LoggedInfo {
  accessToken: string;
  isLogin: boolean;
  userInfo?: UserInfoResponse;
}

interface Auth {
  loggedInfo: LoggedInfo;
  setLoggedInfo: Dispatch<SetStateAction<LoggedInfo>>;
}

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loggedInfo, setLoggedInfo] = useState({} as LoggedInfo);

  return (
    <AuthContext.Provider value={{ loggedInfo, setLoggedInfo }}>{children}</AuthContext.Provider>
  );
}
