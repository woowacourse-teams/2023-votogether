import { useNavigate } from 'react-router-dom';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import LogoButton from '@components/common/LogoButton';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import SquareButton from '@components/common/SquareButton';

import * as S from './style';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Layout isSidebarVisible={false}>
      <S.Wrapper>
        <S.HeaderWrapper>
          <NarrowTemplateHeader>
            <IconButton
              category="back"
              onClick={() => {
                navigate(-1);
              }}
            />
          </NarrowTemplateHeader>
        </S.HeaderWrapper>
        <S.Title>404</S.Title>
        <LogoButton content="icon" style={{ width: '150px', height: '150px' }} />
        <S.Description>요청하신 페이지를 찾을 수 없어요.</S.Description>
        <S.ButtonWrapper>
          <SquareButton
            theme="fill"
            onClick={() => {
              navigate('/');
            }}
          >
            홈으로 가기
          </SquareButton>
        </S.ButtonWrapper>
      </S.Wrapper>
    </Layout>
  );
}
