import React from 'react';

import xMarkIcon from '@assets/x_mark_white.svg';

import * as S from './style';

interface OptionCancelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function OptionCancelButton({ ...rest }: OptionCancelButtonProps) {
  return (
    <S.Container aria-label="삭제" type="button" {...rest}>
      <S.Image src={xMarkIcon} alt="" />
    </S.Container>
  );
}
