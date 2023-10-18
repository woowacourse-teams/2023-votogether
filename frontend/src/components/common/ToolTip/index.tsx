import { ReactNode } from 'react';

import { Size } from '@type/style';

import * as S from './style';

interface ToolTipProps {
  size: Size | 'free';
  children: ReactNode;
}

export default function ToolTip({ size, children }: ToolTipProps) {
  return (
    <S.Container>
      <S.Pointer />
      <S.InnerPointer />
      <S.Content $size={size}>{children}</S.Content>
    </S.Container>
  );
}
