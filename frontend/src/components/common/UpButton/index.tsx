import React from 'react';

import chevronUp from '@assets/chevron_up_primary.svg';

import * as S from './style';

interface UpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function UpButton({ ...rest }: UpButtonProps) {
  return (
    <S.Button {...rest}>
      <img src={chevronUp} alt="페이지 최상단으로 스크롤 올리기" />
    </S.Button>
  );
}
