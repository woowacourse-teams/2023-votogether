import { ButtonHTMLAttributes } from 'react';

import * as S from './style';
import { Size } from './type';

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
