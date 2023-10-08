import { Suspense } from 'react';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';
import MobileLayoutTemplate from '@components/common/MobileLayoutTemplate';
import Skeleton from '@components/common/Skeleton';

import PostDetail from './PostDetail';

export default function PostDetailPage() {
  return (
    <Layout isSidebarVisible={true} isMobileDefaultHeaderVisible={false}>
      <ErrorBoundaryWithNarrowHeader haveIcon={true} retryInteraction={true} homeInteraction={true}>
        <Suspense
          fallback={
            <MobileLayoutTemplate>
              <Skeleton isLarge={true} />
            </MobileLayoutTemplate>
          }
        >
          <PostDetail />
        </Suspense>
      </ErrorBoundaryWithNarrowHeader>
    </Layout>
  );
}
