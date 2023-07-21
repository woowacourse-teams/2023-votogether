import Layout from '@components/common/Layout';
import PostList from '@components/post/PostList';
import PostListPage from '@components/post/PostListPage';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';
import { MOCK_USER_INFO } from '@mocks/mockData/user';

import * as S from './style';

export default function Home() {
  return (
    <>
      <S.Web>
        <Layout
          userInfo={MOCK_USER_INFO}
          categoryList={MOCK_FAVORITE_CATEGORIES}
          isSidebarVisible={true}
          handleFavoriteClick={() => {}}
          handleLogoutClick={() => {}}
        >
          <PostList />
        </Layout>
      </S.Web>
      <S.Mobile>
        <PostListPage
          userInfo={MOCK_USER_INFO}
          categoryList={MOCK_FAVORITE_CATEGORIES}
          handleFavoriteClick={() => {}}
          handleLogoutClick={() => {}}
        />
      </S.Mobile>
    </>
  );
}
