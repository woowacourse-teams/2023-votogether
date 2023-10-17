import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import LoadingSpinner from '@components/common/LoadingSpinner';

import OptionWrapper from './OptionWrapper';
import StatisticsWrapper from './StatisticsWrapper';
import * as S from './style';

export default function VoteStatisticsPage() {
  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  return (
    <Layout isSidebarVisible={true}>
      <S.Container>
        <S.PageHeader>투표 통계</S.PageHeader>
        <S.ContentContainer>
          <ErrorBoundary hasRetryInteraction={true}>
            <Suspense
              fallback={
                <S.LoadingWrapper>
                  <LoadingSpinner size="sm" />
                </S.LoadingWrapper>
              }
            >
              <StatisticsWrapper postId={postId} size="md" />
              <OptionWrapper postId={postId} />
            </Suspense>
          </ErrorBoundary>
        </S.ContentContainer>
      </S.Container>
    </Layout>
  );
}
