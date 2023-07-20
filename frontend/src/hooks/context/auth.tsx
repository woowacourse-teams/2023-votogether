import React, { Dispatch, SetStateAction, createContext, useState } from 'react';

interface Auth {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as Auth);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const accessToken = localStorage.getItem('accessToken');
  const [isLogin, setIsLogin] = useState(accessToken ? true : false);

  return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
}
