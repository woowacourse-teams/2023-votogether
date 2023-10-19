import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';
import NoticeDetailFetcher from '@components/notice/NoticeDetailFetcher';

import * as S from './style';

export default function NoticeDetailPage() {
  return (
    <Layout isSidebarVisible>
      <S.Container>
        <S.Category tabIndex={0}>VoTogether 공지사항</S.Category>
        <ErrorBoundary hasIcon={true} hasRetryInteraction={true}>
          <Suspense fallback={<Skeleton isLarge />}>
            <NoticeDetailFetcher />
          </Suspense>
        </ErrorBoundary>
      </S.Container>
    </Layout>
  );
}
