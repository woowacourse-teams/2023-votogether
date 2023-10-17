import { Suspense } from 'react';

import ErrorBoundaryWithNarrowHeader from '@pages/ErrorBoundaryWithNarrowHeader';

import Layout from '@components/common/Layout';
import MobileLayoutTemplate from '@components/common/MobileLayoutTemplate';
import Skeleton from '@components/common/Skeleton';

import { ERROR_MESSAGE } from '@constants/policyMessage';

import EditPost from './EditPost';

export default function EditPostPage() {
  return (
    <Layout isSidebarVisible={false} isMobileDefaultHeaderVisible={false}>
      <ErrorBoundaryWithNarrowHeader
        text={ERROR_MESSAGE.DEFAULT}
        hasIcon={true}
        hasRetryInteraction={true}
        hasHomeInteraction={true}
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
