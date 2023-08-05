import { Size } from '@type/style';

import * as S from './style';

interface ToastProps {
  children: string;
  size: Size | 'free';
}

export default function Toast({ children, size }: ToastProps) {
  return <S.Wrapper $size={size}>{children}</S.Wrapper>;
}
