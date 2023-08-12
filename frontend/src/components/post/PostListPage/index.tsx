import { Suspense, useContext } from 'react';

import { AuthContext } from '@hooks/context/auth';
import { useCategoryList } from '@hooks/query/category/useCategoryList';
import { useDrawer } from '@hooks/useDrawer';
import { usePostRequestInfo } from '@hooks/usePostRequestInfo';

import ErrorBoundary from '@pages/ErrorBoundary';

import AddButton from '@components/common/AddButton';
import Dashboard from '@components/common/Dashboard';
import Drawer from '@components/common/Drawer';
import NarrowMainHeader from '@components/common/NarrowMainHeader';
import Skeleton from '@components/common/Skeleton';
import UpButton from '@components/common/UpButton';
import PostList from '@components/post/PostList';

import { PATH } from '@constants/path';

import { getSelectedState } from '@utils/post/getSelectedState';
import { scrollToTop } from '@utils/scrollToTop';

import * as S from './style';

export default function PostListPage() {
  const { drawerRef, closeDrawer, openDrawer } = useDrawer('left');

  const { isLoggedIn: isLogged, userInfo } = useContext(AuthContext).loggedInfo;
  const { data: categoryList } = useCategoryList(isLogged);
  const { postOptionalOption, postType } = usePostRequestInfo();
  const { categoryId, keyword } = postOptionalOption;

  const selectedState = getSelectedState({
    categoryId,
    keyword,
    categoryList: categoryList ?? [],
    postType,
  });

  const handleLogoutClick = () => {};

  return (
    <S.Container>
      <S.HeaderWrapper>
        <NarrowMainHeader handleMenuOpenClick={openDrawer} />
      </S.HeaderWrapper>
      <S.DrawerWrapper>
        <Drawer handleDrawerClose={closeDrawer} placement="left" width="225px" ref={drawerRef}>
          <Dashboard
            userInfo={userInfo}
            categoryList={categoryList ?? []}
            handleLogoutClick={handleLogoutClick}
            selectedState={selectedState}
          />
        </Drawer>
      </S.DrawerWrapper>
      <ErrorBoundary fallback={<div>에러발생</div>}>
        <Suspense fallback={<Skeleton isLarge={true} />}>
          <PostList />
        </Suspense>
      </ErrorBoundary>
      <S.ButtonContainer>
        <UpButton onClick={scrollToTop} />
        <S.AddButtonWrapper to={PATH.POST_WRITE}>
          <AddButton size="lg" />
        </S.AddButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
