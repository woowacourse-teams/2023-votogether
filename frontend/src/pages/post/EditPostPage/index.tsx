import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';

import * as S from '../writePageStyle';

import EditPost from './EditPost';

export default function EditPostPage() {
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
          <EditPost />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
}
