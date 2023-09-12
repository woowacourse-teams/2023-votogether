import { Size } from '@type/style';

import * as S from './style';

interface ToastProps {
  children: string;
  size: Size | 'free';
  position: 'top' | 'bottom';
}

export default function Toast({ children, size, position }: ToastProps) {
  return (
    <S.Wrapper $position={position}>
      <S.Content aria-live="polite" $size={size}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
}
