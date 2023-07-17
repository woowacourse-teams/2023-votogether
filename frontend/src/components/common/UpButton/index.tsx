import React from 'react';

import chevronUp from '@assets/chevron_up_primary.svg';

import * as S from './style';

interface UpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function UpButton({ ...rest }: UpButtonProps) {
  return (
    <S.Button {...rest}>
      <S.Image src={chevronUp} alt="" />
    </S.Button>
  );
}
