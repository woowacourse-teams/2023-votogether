import { ButtonHTMLAttributes } from 'react';

import * as S from './style';
import { Size } from './type';

interface AddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
}

/* 글쓰기 버튼, 선택지 추가 버튼 등 크기가 다른 용도로 사용할 예정이기 때문에
 * props로 s/m/l 크기를 받음
 */
export default function AddButton({ size, ...rest }: AddButtonProps) {
  return (
    <S.Button size={size} aria-label="더하기" {...rest}>
      +
    </S.Button>
  );
}
