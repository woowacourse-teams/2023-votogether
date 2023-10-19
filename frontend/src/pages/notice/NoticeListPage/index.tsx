import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';
import NoticeListFetcher from '@components/notice/NoticeListFetcher';

import * as S from './style';

export default function NoticeListPage() {
  return (
    <Layout isSidebarVisible isChannelTalkVisible={false}>
      <S.Container>
        <S.Title tabIndex={0}>보투게더 소식</S.Title>
        <ErrorBoundary hasIcon={true} hasRetryInteraction={true}>
          <Suspense fallback={<Skeleton isLarge />}>
            <NoticeListFetcher />
          </Suspense>
        </ErrorBoundary>
      </S.Container>
    </Layout>
  );
}
