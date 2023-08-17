import { ReactNode } from 'react';

import { Size } from '@type/style';

import * as S from './style';

interface SnackBarProps {
  children: ReactNode;
  size: Size | 'free';
  position: 'top' | 'bottom';
}

export default function SnackBar({ children, size, position }: SnackBarProps) {
  return (
    <S.Wrapper $position={position}>
      <S.Content $size={size} $isOpen={true}>
        {children}
      </S.Content>
    </S.Wrapper>
  );
}
