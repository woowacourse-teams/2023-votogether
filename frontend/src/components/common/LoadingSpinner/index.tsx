import { Size } from '../AddButton/type';

import * as S from './style';

interface LoadingSpinnerProps {
  size: Size;
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps) {
  return (
    <S.Container $size={size}>
      <S.Unit $size={size} />
      <S.Unit $size={size} />
      <S.Unit $size={size} />
    </S.Container>
  );
}
