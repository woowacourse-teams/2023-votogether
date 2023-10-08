import { Suspense, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PostOptionContext } from '@hooks/context/postOption';
import { useCreatePost } from '@hooks/query/post/useCreatePost';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';
import PostForm from '@components/PostForm';

import { SORTING, STATUS } from '@constants/post';

import * as S from '../writePageStyle';

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
      <ErrorBoundary
        text={errorText}
        haveIcon={true}
        retryInteraction={true}
        homeInteraction={true}
      >
        <Suspense
          fallback={
            <>
              <NarrowTemplateHeader />
              <S.SkeletonWrapper>
                <Skeleton isLarge={true} />
              </S.SkeletonWrapper>
            </>
          }
        >
          <PostForm mutate={mutate} isSubmitting={isLoading} />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
