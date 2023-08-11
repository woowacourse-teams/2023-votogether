import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';

import PostDetail from './PostDetail';

export default function PostDetailPage() {
  return (
    <Layout isSidebarVisible={true}>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton isLarge={true} />}>
          <PostDetail />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
