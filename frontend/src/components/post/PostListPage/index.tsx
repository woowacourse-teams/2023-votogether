import { Suspense, useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';
import { useDrawer } from '@hooks/useDrawer';

import AddButton from '@components/common/AddButton';
import Dashboard from '@components/common/Dashboard';
import Drawer from '@components/common/Drawer';
import NarrowMainHeader from '@components/common/NarrowMainHeader';
import Skeleton from '@components/common/Skeleton';
import UpButton from '@components/common/UpButton';
import PostList from '@components/post/PostList';

import { PATH } from '@constants/path';

import { scrollToTop } from '@utils/scrollToTop';

import * as S from './style';

export default function PostListPage() {
  const { drawerRef, closeDrawer, openDrawer } = useDrawer('left');

  const { loggedInfo } = useContext(AuthContext);
  const isLoggedIn = loggedInfo.isLogin;
  const { data: categoryList } = useCategoryList(isLoggedIn);

  const handleLogoutClick = () => {};

  return (
    <S.Container>
      <S.HeaderWrapper>
        <NarrowMainHeader handleMenuOpenClick={openDrawer} />
      </S.HeaderWrapper>
      <S.DrawerWrapper>
        <Drawer handleDrawerClose={closeDrawer} placement="left" width="225px" ref={drawerRef}>
          <Dashboard
            userInfo={loggedInfo.userInfo}
            categoryList={categoryList ?? []}
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
