import { createPortal } from 'react-dom';

import { ToastInfo } from '@hooks/context/toast';

import Toast from '@components/common/Toast';

interface ToastContainerProps {
  toastList: ToastInfo[];
}

export default function ToastContainer({ toastList }: ToastContainerProps) {
  const rootElem = document.getElementById('toast-root') as HTMLElement;

  return createPortal(
    toastList.map(toast => (
      <Toast size="sm" position="bottom">
        {toast.text}
      </Toast>
    )),
    rootElem
  );
}
