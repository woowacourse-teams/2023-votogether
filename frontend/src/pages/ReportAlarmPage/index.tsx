import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';

import ReportApproveResult from './ReportApproveResult';
import * as S from './style';

export default function ReportAlarmPage() {
  return (
    <Layout isSidebarVisible={true} isChannelTalkVisible={false}>
      <S.Container>
        <S.PageHeader>신고 조치 상세</S.PageHeader>
        <ErrorBoundary>
          <Suspense fallback={<Skeleton isLarge={true} />}>
            <S.ContentContainer>
              <ReportApproveResult />
            </S.ContentContainer>
          </Suspense>
        </ErrorBoundary>
      </S.Container>
    </Layout>
  );
}
