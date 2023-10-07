import { ToastInfo } from '@hooks/context/toast';

import Toast from '@components/common/Toast';

import * as S from './style';
interface ToastContainerProps {
  toastList: ToastInfo[];
}

export default function ToastContainer({ toastList }: ToastContainerProps) {
  return (
    <S.Container>
      {toastList.map(toast => (
        <Toast key={toast.id} size="free">
          {toast.text}
        </Toast>
      ))}
    </S.Container>
  );
}
