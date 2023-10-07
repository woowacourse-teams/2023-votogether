import { memo, useState } from 'react';

import { Size } from '@type/style';

import { TOAST_TIME } from '@constants/animation';

import * as S from './style';

interface ToastProps {
  children: string;
  size: Size | 'free';
}

export default memo(function Toast({ children, size }: ToastProps) {
  const [isBlind, setIsBlind] = useState(false);

  const timeId = window.setTimeout(() => {
    window.clearTimeout(timeId);
    setIsBlind(true);
  }, TOAST_TIME);

  return (
    <S.Content aria-live="polite" $size={size} $isBlind={isBlind}>
      {children}
    </S.Content>
  );
});
