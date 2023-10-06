import { PropsWithChildren, createContext, useEffect, useState } from 'react';

import ToastContainer from '@components/ToastContainer';

import { TOAST_TIME } from '@constants/animation';

export interface ToastInfo {
  id: number;
  text: string;
}

export const ToastContext = createContext({
  addMessage: (message: string) => {},
});

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toastList, setToastList] = useState<ToastInfo[]>([]);

  const addMessage = (message: string) => {
    if (toastList.find(toast => toast.text === message)) return;

    const timeId = window.setTimeout(() => {
      setToastList(toastList => toastList.filter(toast => toast.id !== timeId));
      window.clearTimeout(timeId);
    }, TOAST_TIME * 1000);

    setToastList(toastList => [...toastList, { text: message, id: timeId }]);
  };

  useEffect(() => {
    return () => toastList.forEach(({ id }) => window.clearTimeout(id));
  }, []);

  return (
    <ToastContext.Provider value={{ addMessage }}>
      <ToastContainer toastList={toastList} />
      {children}
    </ToastContext.Provider>
  );
}
