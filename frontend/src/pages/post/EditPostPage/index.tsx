import { Suspense } from 'react';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';
import MobileLayoutTemplate from '@components/common/MobileLayoutTemplate';
import Skeleton from '@components/common/Skeleton';

import EditPost from './EditPost';

export default function EditPostPage() {
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
          <EditPost />
        </Suspense>
      </ErrorBoundaryWithNarrowHeader>
    </Layout>
  );
}
