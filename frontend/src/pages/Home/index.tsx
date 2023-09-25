import AppInstallPrompt from '@components/common/AppInstallPrompt';
import Layout from '@components/common/Layout';

import PostListPage from './PostListPage';

export default function Home() {
  return (
    <Layout isSidebarVisible={true} isMobileDefaultHeaderVisible={false}>
      <PostListPage />
      <AppInstallPrompt />
    </Layout>
  );
}
