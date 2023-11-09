import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import ToastContainer from '@components/ToastContainer';

import { TOAST_TIME } from '@constants/animation';

export interface ToastInfo {
  id: number;
  text: string;
}

interface ToastContextProps {
  addMessage: (message: string) => void;
  setElementId: Dispatch<SetStateAction<ToastContentId>>;
}

export const ToastContext = createContext<ToastContextProps>({
  addMessage: (message: string) => {},
  setElementId: () => {},
});

type ToastContentId = 'toast-content' | 'drawer-toast-content';

export default function ToastProvider({ children }: PropsWithChildren) {
  const [toastList, setToastList] = useState<ToastInfo[]>([]);
  const [toastElementId, setToastElementId] = useState<ToastContentId>('toast-content');
  const toastContentEl = document.getElementById(toastElementId);

  const timeId = useRef<number | null>(null);

  const addMessage = (message: string) => {
    if (toastList.find(toast => toast.text === message)) return;

    const id = Date.now();
    setToastList(toastList => [...toastList, { id, text: message }]);
  };

  useEffect(() => {
    if (timeId.current) window.clearTimeout(timeId.current);

    if (toastList.length !== 0) {
      timeId.current = window.setTimeout(() => {
        setToastList([]);

        if (timeId.current) window.clearTimeout(timeId.current);
      }, TOAST_TIME);
    }
  }, [toastList]);

  return (
    <ToastContext.Provider value={{ addMessage, setElementId: setToastElementId }}>
      {toastContentEl && createPortal(<ToastContainer toastList={toastList} />, toastContentEl)}
      {children}
    </ToastContext.Provider>
  );
}
