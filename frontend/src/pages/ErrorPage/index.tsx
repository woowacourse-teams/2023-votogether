import { useNavigate } from 'react-router-dom';

import Layout from '@components/common/Layout';
import LogoButton from '@components/common/LogoButton';
import SquareButton from '@components/common/SquareButton';

import * as S from './style';

export default function ErrorPage({ message }: { message?: string }) {
  const navigate = useNavigate();

  return (
    <Layout isSidebarVisible={false}>
      <S.Wrapper>
        <S.Description>{message ? message : '요청 중 오류가 발생했습니다.'}</S.Description>
        <LogoButton content="icon" style={{ width: '100px', height: '100px' }} />
        <S.Text>오류가 지속되는 경우 votogether2023@gmail.com 로 문의해주세요.</S.Text>
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
              window.location.reload();
            }}
          >
            새로 고침
          </SquareButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Layout>
  );
}
