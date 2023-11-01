import { Suspense } from 'react';

import { Skeleton } from 'votogether-design-system';

import Layout from '@components/common/Layout';
import UpButton from '@components/common/UpButton';

import { REPORT_ACTION_TYPE } from '@constants/report';

import { smoothScrollToTop } from '@utils/scrollToTop';

import PendingReportTableFetcher from './PendingReportTableFetcher';
import * as S from './style';

export interface ReportDetail {
  typeName: keyof typeof REPORT_ACTION_TYPE;
  target: string;
}

export default function PendingReportPage() {
  return (
    <Layout isSidebarVisible={false}>
      <S.Wrapper>
        <S.PageTitle>신고 조치 예정 목록</S.PageTitle>
        <Suspense fallback={<Skeleton isLarge />}>
          <PendingReportTableFetcher />
        </Suspense>
        <S.ButtonContainer>
          <UpButton onClick={smoothScrollToTop} />
        </S.ButtonContainer>
      </S.Wrapper>
    </Layout>
  );
}
