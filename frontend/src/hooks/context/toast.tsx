import { PropsWithChildren, createContext, useEffect, useRef, useState } from 'react';

import ToastContainer from '@components/ToastContainer';

import { TOAST_TIME } from '@constants/animation';

export interface ToastInfo {
  id: number;
  text: string;
}

interface ToastContextProps {
  addMessage: (message: string) => void;
}

export const ToastContext = createContext<ToastContextProps>({
  addMessage: (message: string) => {},
});

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toastList, setToastList] = useState<ToastInfo[]>([]);

  const timeId = useRef<number | null>(null);

  useEffect(() => {
    if (timeId.current) window.clearTimeout(timeId.current);

    if (toastList.length !== 0) {
      timeId.current = window.setTimeout(() => {
        setToastList([]);

        if (timeId.current) window.clearTimeout(timeId.current);
      }, TOAST_TIME);
    }
  }, [toastList]);

  const addMessage = (message: string) => {
    if (toastList.find(toast => toast.text === message)) return;

    const id = Date.now();
    setToastList(toastList => [...toastList, { id, text: message }]);
  };

  return (
    <ToastContext.Provider value={{ addMessage }}>
      <ToastContainer toastList={toastList} />
      {children}
    </ToastContext.Provider>
  );
}
