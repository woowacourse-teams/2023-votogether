import Layout from '@components/common/Layout';
import PostListPage from '@components/post/PostListPage';

export default function Home() {
  return (
    <Layout isSidebarVisible={true}>
      <PostListPage />
    </Layout>
  );
}
