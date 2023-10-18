import { Suspense } from 'react';

import ErrorBoundary from '@pages/ErrorBoundary';

import Skeleton from '@components/common/Skeleton';
import AdminNoticeEdit from '@components/notice/AdminNoticeEdit';

export default function NoticeEditPage() {
  return (
    <ErrorBoundary hasRetryInteraction>
      <Suspense fallback={<Skeleton isLarge />}>
        <AdminNoticeEdit />
      </Suspense>
    </ErrorBoundary>
  );
}
