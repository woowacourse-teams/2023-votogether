import { useNavigate } from 'react-router-dom';

import IconButton from '@components/common/IconButton';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';

import * as S from './style';

export default function PostDetailFallback() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.HeaderContainer>
        <NarrowTemplateHeader>
          <IconButton
            category="back"
            onClick={() => {
              navigate(-1);
            }}
          />
        </NarrowTemplateHeader>
      </S.HeaderContainer>
      <S.SkeletonWrapper>
        <Skeleton isLarge={true} />
      </S.SkeletonWrapper>
    </S.Container>
  );
}
