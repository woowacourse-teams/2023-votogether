import { Suspense } from 'react';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';
import NarrowTemplateHeader from '@components/common/NarrowTemplateHeader';
import Skeleton from '@components/common/Skeleton';

import EditPost from './EditPost';
import * as S from './style';

export default function EditPostPage() {
  return (
    <Layout isSidebarVisible={false}>
      <ErrorBoundaryWithNarrowHeader>
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
      </ErrorBoundaryWithNarrowHeader>
    </Layout>
  );
}
