import { createPortal } from 'react-dom';

import { ToastInfo } from '@hooks/context/toast';

import Toast from '@components/common/Toast';

import * as S from './style';
interface ToastContainerProps {
  toastList: ToastInfo[];
}

export default function ToastContainer({ toastList }: ToastContainerProps) {
  const rootElem = document.getElementById('toast-root') as HTMLElement;

  return createPortal(
    <S.Container>
      {toastList.map(toast => (
        <Toast key={toast.id} size="free" position="bottom">
          {toast.text}
        </Toast>
      ))}
    </S.Container>,
    rootElem
  );
}
