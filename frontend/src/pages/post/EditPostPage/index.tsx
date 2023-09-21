import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';

import EditPost from './EditPost';
import * as S from './style';

export default function EditPostPage() {
  return (
    <Layout isSidebarVisible={false}>
      <ErrorBoundary>
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
