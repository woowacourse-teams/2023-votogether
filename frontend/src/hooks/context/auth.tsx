import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

interface LoggedInfo {
  accessToken: string;
  nickname: string;
  isLogin: boolean;
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
