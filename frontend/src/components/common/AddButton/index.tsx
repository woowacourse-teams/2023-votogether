import { ButtonHTMLAttributes } from 'react';

import { Size } from '@type/style';

import * as S from './style';

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
}

export default function AddButton({ size, ...rest }: AddButtonProps) {
  return (
    <S.Button size={size} aria-label="더하기" {...rest}>
      +
    </S.Button>
  );
}
