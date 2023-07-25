import Layout from '@components/common/Layout';
import PostListPage from '@components/post/PostListPage';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';
import { MOCK_USER_INFO } from '@mocks/mockData/user';

export default function Home() {
  return (
    <Layout
      userInfo={MOCK_USER_INFO}
      categoryList={MOCK_FAVORITE_CATEGORIES}
      isSidebarVisible={true}
      handleFavoriteClick={() => {}}
      handleLogoutClick={() => {}}
    >
      <PostListPage
        userInfo={MOCK_USER_INFO}
        categoryList={MOCK_FAVORITE_CATEGORIES}
        handleFavoriteClick={() => {}}
        handleLogoutClick={() => {}}
      />
    </Layout>
  );
}
