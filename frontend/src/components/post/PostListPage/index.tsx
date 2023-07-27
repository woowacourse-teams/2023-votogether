import { Suspense } from 'react';

import { useUserInfo } from '@hooks/query/user/useUserInfo';
import { useDrawer } from '@hooks/useDrawer';

import AddButton from '@components/common/AddButton';
import Dashboard from '@components/common/Dashboard';
import Drawer from '@components/common/Drawer';
import NarrowMainHeader from '@components/common/NarrowMainHeader';
import Skeleton from '@components/common/Skeleton';
import UpButton from '@components/common/UpButton';
import PostList from '@components/post/PostList';

import { PATH } from '@constants/path';

import { MOCK_FAVORITE_CATEGORIES } from '@mocks/mockData/category';

import * as S from './style';

export default function PostListPage() {
  const { drawerRef, closeDrawer, openDrawer } = useDrawer('left');

  //추후 구현 예정
  const categoryList = MOCK_FAVORITE_CATEGORIES;
  const { data: userInfo } = useUserInfo();
  const handleFavoriteClick = () => {};
  const handleLogoutClick = () => {};

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <S.Container>
      <S.HeaderWrapper>
        <NarrowMainHeader handleMenuOpenClick={openDrawer} />
      </S.HeaderWrapper>
      <S.DrawerWrapper>
        <Drawer handleDrawerClose={closeDrawer} placement="left" width="225px" ref={drawerRef}>
          <Dashboard
            userInfo={userInfo}
            categoryList={categoryList}
            handleFavoriteClick={handleFavoriteClick}
            handleLogoutClick={handleLogoutClick}
          />
        </Drawer>
      </S.DrawerWrapper>
      <Suspense fallback={<Skeleton />}>
        <PostList />
      </Suspense>
      <S.ButtonContainer>
        <UpButton onClick={scrollToTop} />
        <S.AddButtonWrapper to={PATH.POST_WRITE}>
          <AddButton size="lg" />
        </S.AddButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
