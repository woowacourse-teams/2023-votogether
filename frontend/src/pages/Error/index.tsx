import { useNavigate } from 'react-router-dom';

import Layout from '@components/common/Layout';
import SquareButton from '@components/common/SquareButton';

import * as S from './style';

export default function Error({ message }: { message?: string }) {
  const navigate = useNavigate();

  return (
    <Layout isSidebarVisible={false}>
      <S.Wrapper>
        <S.Description>{message ? message : '요청 중 오류가 발생했습니다.'}</S.Description>
        <S.ButtonWrapper>
          <SquareButton
            theme="fill"
            onClick={() => {
              navigate('/');
            }}
          >
            홈으로 가기
          </SquareButton>
          <SquareButton
            theme="gray"
            onClick={() => {
              navigate(-1);
            }}
          >
            다시 시도
          </SquareButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Layout>
  );
}
