import { ButtonHTMLAttributes } from 'react';

import * as S from './style';

interface HeaderTextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isLoading?: boolean;
}

/* 헤더에 포함되어 취소, 확인, 신고 등 사용될 버튼
 * props로 s/m/l 크기를 받음
 */
export default function HeaderTextButton({
  children,
  isLoading = false,
  ...rest
}: HeaderTextButtonProps) {
  return (
    <S.Button $isLoading={isLoading} {...rest}>
      {children}
    </S.Button>
  );
}
