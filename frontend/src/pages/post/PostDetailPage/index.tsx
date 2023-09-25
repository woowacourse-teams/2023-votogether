import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';

import PostDetail from './PostDetail';
import PostDetailFallback from './PostDetailFallback';

export default function PostDetailPage() {
  return (
    <Layout isSidebarVisible={true} isMobileDefaultHeaderVisible={false}>
      <ErrorBoundary>
        <Suspense fallback={<PostDetailFallback />}>
          <PostDetail />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
