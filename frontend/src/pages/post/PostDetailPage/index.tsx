import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';
import MobileLayoutTemplate from '@components/common/MobileLayoutTemplate';
import Skeleton from '@components/common/Skeleton';

import PostDetail from './PostDetail';

export default function PostDetailPage() {
  const params = useParams() as { postId: string };
  const postId = Number(params.postId);

  return (
    <Layout isSidebarVisible={true} isMobileDefaultHeaderVisible={false}>
      <ErrorBoundaryWithNarrowHeader
        hasIcon={true}
        hasRetryInteraction={true}
        hasHomeInteraction={true}
        key={postId}
      >
        <Suspense
          fallback={
            <MobileLayoutTemplate>
              <Skeleton isLarge={true} />
            </MobileLayoutTemplate>
          }
        >
          <PostDetail postId={postId} />
        </Suspense>
      </ErrorBoundaryWithNarrowHeader>
    </Layout>
  );
}
