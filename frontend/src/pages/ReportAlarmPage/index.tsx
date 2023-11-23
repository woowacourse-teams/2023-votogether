import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';

import ReportApproveResult from './ReportApproveResult';
import * as S from './style';

export default function ReportAlarmPage() {
  const params = useParams() as { reportId: string };
  const reportId = Number(params.reportId);

  return (
    <Layout isSidebarVisible={true} isChannelTalkVisible={false}>
      <S.Container>
        <S.PageHeader>신고 조치 상세</S.PageHeader>
        <ErrorBoundary hasHomeInteraction hasIcon key={reportId}>
          <Suspense fallback={<Skeleton isLarge={true} />}>
            <S.ContentContainer>
              <ReportApproveResult reportId={reportId} />
            </S.ContentContainer>
          </Suspense>
        </ErrorBoundary>
      </S.Container>
    </Layout>
  );
}
