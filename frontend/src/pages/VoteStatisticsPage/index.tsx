import { Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ErrorBoundary from '@pages/ErrorBoundary';

import IconButton from '@components/common/IconButton';
import Layout from '@components/common/Layout';
import LoadingSpinner from '@components/common/LoadingSpinner';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';

import OptionWrapper from './OptionWrapper';
import StatisticsWrapper from './StatisticsWrapper';
import * as S from './style';

export default function VoteStatisticsPage() {
  const params = useParams() as { postId: string };
  const postId = Number(params.postId);
  const navigate = useNavigate();

  return (
    <Layout isSidebarVisible={true}>
      <S.HeaderWrapper>
        <NarrowTemplateHeader>
          <IconButton category="back" onClick={() => navigate(-1)} />
        </NarrowTemplateHeader>
      </S.HeaderWrapper>
      <S.Container>
        <S.PageHeader>투표 통계</S.PageHeader>
        <S.OptionContainer>
          <Suspense
            fallback={
              <S.LoadingWrapper>
                <LoadingSpinner size="sm" />
              </S.LoadingWrapper>
            }
          >
            <ErrorBoundary>
              <StatisticsWrapper postId={postId} size="md" />
            </ErrorBoundary>
          </Suspense>
          <ErrorBoundary>
            <OptionWrapper postId={postId} />
          </ErrorBoundary>
        </S.OptionContainer>
      </S.Container>
    </Layout>
  );
}
