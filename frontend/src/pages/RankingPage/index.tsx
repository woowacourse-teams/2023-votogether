import Layout from '@components/common/Layout';

import PageContent from './PageContent';
import * as S from './style';

export default function RankingPage() {
  return (
    <Layout isSidebarVisible={true} isChannelTalkVisible={false}>
      <S.Container>
        <S.PageHeader>🏆 랭킹 🏆</S.PageHeader>
        <S.ContentContainer>
          <PageContent />
        </S.ContentContainer>
      </S.Container>
    </Layout>
  );
}
