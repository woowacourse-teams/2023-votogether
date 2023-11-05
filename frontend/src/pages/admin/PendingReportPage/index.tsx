import { Suspense } from 'react';

import { Skeleton } from 'votogether-design-system';

import Layout from '@components/common/Layout';
import UpButton from '@components/common/UpButton';

import { smoothScrollToTop } from '@utils/scrollToTop';

import PendingReportTableFetcher from './PendingReportTableFetcher';
import * as S from './style';

export default function PendingReportPage() {
  return (
    <Layout isSidebarVisible={false}>
      <Suspense fallback={<Skeleton isLarge />}>
        <S.Wrapper>
          <S.PageTitle>신고 조치 예정 목록</S.PageTitle>
          <PendingReportTableFetcher />
          <S.ButtonContainer>
            <UpButton onClick={smoothScrollToTop} />
          </S.ButtonContainer>
        </S.Wrapper>
      </Suspense>
    </Layout>
  );
}
