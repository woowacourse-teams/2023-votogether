import { ReactNode } from 'react';

import * as S from './style';

interface ActiveContainerProps {
  isActive: boolean;
  children: ReactNode;
}

export default function ActiveContainer({ isActive, children }: ActiveContainerProps) {
  return (
    <S.Container>
      <S.Active $isActive={isActive} />
      {children}
    </S.Container>
  );
}
