import { ButtonHTMLAttributes } from 'react';

import { Size } from '../AddButton/type';

import * as S from './style';

interface TagButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
}

export default function TagButton({ size, ...rest }: TagButtonProps) {
  return (
    <S.Button $size={size} {...rest}>
      {rest.children}
    </S.Button>
  );
}
