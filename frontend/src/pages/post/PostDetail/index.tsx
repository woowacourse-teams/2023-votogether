import { Suspense, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '@hooks/context/auth';
import { useCommentList } from '@hooks/query/comment/useCommentList';

import ErrorBoundary from '@pages/ErrorBoundary';

import CommentList from '@components/comment/CommentList';
import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';

import PostDetailFetcher from './PostDetailFetcher';

export default function PostDetailPage() {
  const params = useParams() as { postId: string };
  const postId = Number(params.postId);
  const { loggedInfo } = useContext(AuthContext);
  const { data: commentData, isLoading: isCommentLoading } = useCommentList(postId);

  return (
    <Layout isSidebarVisible={true}>
      <ErrorBoundary>
        <Suspense fallback={<Skeleton isLarge={true} />}>
          <PostDetailFetcher postId={postId} memberId={1} />
        </Suspense>
      </ErrorBoundary>
      {!isCommentLoading && commentData && (
        <CommentList
          commentList={commentData}
          memberId={loggedInfo.id}
          isGuest={!loggedInfo.isLoggedIn}
          postWriterName={'익명의손님1'}
        />
      )}
    </Layout>
  );
}
