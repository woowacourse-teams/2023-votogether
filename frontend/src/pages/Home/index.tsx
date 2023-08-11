import AppInstallPrompt from '@components/common/AppInstallPrompt';
import MobileInstallPrompt from '@components/common/AppInstallPrompt/MobileInstallPrompt';
import Layout from '@components/common/Layout';
import PostListPage from '@components/post/PostListPage';

export default function Home() {
  return (
    <Layout isSidebarVisible={true}>
      <PostListPage />
      <AppInstallPrompt />
      <MobileInstallPrompt
        platform="ios"
        handleCancelClick={() => {}}
        handleInstallClick={() => {}}
      />
    </Layout>
  );
}
