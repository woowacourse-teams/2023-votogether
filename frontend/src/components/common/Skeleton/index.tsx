import * as S from './style';

interface SkeletonProps {
  isLarge: boolean;
}

export default function Skeleton({ isLarge }: SkeletonProps) {
  return (
    <S.Container tabIndex={0} aria-label="현재 페이지의 내용을 불러오는 중입니다.">
      <S.FirstBox $isLarge={isLarge} />
      <S.SecondBox />
      <S.ThirdBox />
    </S.Container>
  );
}
