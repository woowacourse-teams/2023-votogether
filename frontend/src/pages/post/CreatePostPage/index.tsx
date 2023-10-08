import { Suspense, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostOptionContext } from '@hooks/context/postOption';
import { useCreatePost } from '@hooks/query/post/useCreatePost';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';
import MobileLayoutTemplate from '@components/common/MobileLayoutTemplate';
import Skeleton from '@components/common/Skeleton';
import PostForm from '@components/PostForm';

import { SORTING, STATUS } from '@constants/post';

export default function CreatePostPage() {
  const navigate = useNavigate();

  const { mutate, isSuccess, isLoading } = useCreatePost();
  const { setPostOption } = useContext(PostOptionContext);

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
      setPostOption({ sorting: SORTING.LATEST, status: STATUS.PROGRESS });
    }
  }, [isSuccess, navigate]);

  const errorText = '요청을 처리할 수 없습니다. 잠시후 다시 시도해주세요.';

  return (
    <Layout isSidebarVisible={false} isMobileDefaultHeaderVisible={false}>
      <ErrorBoundaryWithNarrowHeader
        text={errorText}
        haveIcon={true}
        retryInteraction={true}
        homeInteraction={true}
      >
        <Suspense
          fallback={
            <MobileLayoutTemplate>
              <Skeleton isLarge={true} />
            </MobileLayoutTemplate>
          }
        >
          <PostForm mutate={mutate} isSubmitting={isLoading} />
        </Suspense>
      </ErrorBoundaryWithNarrowHeader>
    </Layout>
  );
}
