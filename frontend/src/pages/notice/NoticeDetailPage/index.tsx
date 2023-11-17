import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';
import NoticeDetailFetcher from '@components/notice/NoticeDetailFetcher';

import * as S from './style';

export default function NoticeDetailPage() {
  const { noticeId: NoticeIdParam } = useParams();
  const noticeId = Number(NoticeIdParam) ?? 0;

  return (
    <Layout isSidebarVisible>
      <S.Container>
        <S.Category tabIndex={0}>VoTogether 공지사항</S.Category>
        <ErrorBoundary hasIcon={true} hasRetryInteraction={true} key={noticeId}>
          <Suspense fallback={<Skeleton isLarge />}>
            <NoticeDetailFetcher noticeId={noticeId} />
          </Suspense>
        </ErrorBoundary>
      </S.Container>
    </Layout>
  );
}
