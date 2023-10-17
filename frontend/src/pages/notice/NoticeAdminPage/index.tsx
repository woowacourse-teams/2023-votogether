import { Suspense } from 'react';

import Layout from '@components/common/Layout';
import Skeleton from '@components/common/Skeleton';
import AdminNoticeTableFetcher from '@components/notice/AdminNoticeTableFetcher';

export default function NoticeAdminPage() {
  return (
    <Layout isSidebarVisible={false} isChannelTalkVisible={false}>
      <Suspense fallback={<Skeleton isLarge />}>
        <AdminNoticeTableFetcher />
      </Suspense>
    </Layout>
  );
}
