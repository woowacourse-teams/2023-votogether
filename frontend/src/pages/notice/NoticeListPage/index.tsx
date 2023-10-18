import Layout from '@components/common/Layout';
import NoticeListFetcher from '@components/notice/NoticeListFetcher';

import * as S from './style';

export default function NoticeListPage() {
  return (
    <Layout isSidebarVisible isChannelTalkVisible={false}>
      <S.Container>
        <S.Title tabIndex={0}>보투게더 소식</S.Title>
        <NoticeListFetcher />
      </S.Container>
    </Layout>
  );
}
