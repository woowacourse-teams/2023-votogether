import { Suspense } from 'react';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';

import PostDetail from './PostDetail';
import PostDetailFallback from './PostDetailFallback';

export default function PostDetailPage() {
  return (
    <Layout isSidebarVisible={true}>
      <ErrorBoundaryWithNarrowHeader>
        <Suspense fallback={<PostDetailFallback />}>
          <PostDetail />
        </Suspense>
      </ErrorBoundaryWithNarrowHeader>
    </Layout>
  );
}
