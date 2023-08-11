import * as S from './style';

interface SkeletonProps {
  isLarge: boolean;
}

export default function Skeleton({ isLarge }: SkeletonProps) {
  return (
    <S.Container>
      <S.FirstBox $isLarge={isLarge} />
      <S.SecondBox />
      <S.ThirdBox />
    </S.Container>
  );
}
