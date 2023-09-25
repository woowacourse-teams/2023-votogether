import Skeleton from '@components/common/Skeleton';

import * as S from './style';

export default function PostDetailFallback() {
  return (
    <S.Container>
      <S.SkeletonWrapper>
        <Skeleton isLarge={true} />
      </S.SkeletonWrapper>
    </S.Container>
  );
}
