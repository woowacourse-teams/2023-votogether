import { useEffect, useRef } from 'react';

import { Size } from '@type/style';

import * as S from './style';

interface ToastProps {
  children: string;
  size: Size | 'free';
  position: 'top' | 'bottom';
}

export default function Toast({ children, size, position }: ToastProps) {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.focus();
    }
  }, []);

  return (
    <S.Wrapper ref={toastRef} tabIndex={-1} role="alert" aria-live="assertive" $position={position}>
      <S.Content $size={size}>{children}</S.Content>
    </S.Wrapper>
  );
}
