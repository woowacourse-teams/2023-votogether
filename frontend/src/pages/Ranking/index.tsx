import { useNavigate } from 'react-router-dom';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';

import PageContent from './PageContent';
import * as S from './style';

export default function Ranking() {
  const navigate = useNavigate();

  return (
    <Layout isSidebarVisible={true}>
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
      <S.Container>
        <S.PageHeader>🏆 랭킹 🏆</S.PageHeader>
        <S.ContentContainer>
          <PageContent />
        </S.ContentContainer>
      </S.Container>
    </Layout>
  );
}
