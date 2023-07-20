import Layout from '@components/common/Layout';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';

import PostList from './post/PostList';

export default function Home() {
  return (
    <>
      <Layout
        categoryList={MOCK_FAVORITE_CATEGORIES}
        isSidebarVisible={true}
        handleFavoriteClick={() => {}}
        handleLogoutClick={() => {}}
      >
        <PostList />
      </Layout>
      <Layout
        categoryList={MOCK_FAVORITE_CATEGORIES}
        isSidebarVisible={false}
        handleFavoriteClick={() => {}}
        handleLogoutClick={() => {}}
      >
        <PostList />
      </Layout>
    </>
  );
}
