import Layout from '@components/common/Layout';
import NoticeDetail from '@components/notice/NoticeDetail';

import { MOCK_TRANSFORM_NOTICE } from '@mocks/mockData/notice';

import * as S from './style';

export default function NoticeDetailPage() {
  return (
    <Layout isSidebarVisible>
      <S.Container>
        <NoticeDetail notice={MOCK_TRANSFORM_NOTICE} />
      </S.Container>
    </Layout>
  );
}
