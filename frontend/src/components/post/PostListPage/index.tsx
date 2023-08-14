import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDrawer } from '@hooks/useDrawer';

import ErrorBoundary from '@pages/ErrorBoundary';

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
  const nav = useNavigate();
  const { drawerRef, closeDrawer, openDrawer } = useDrawer('left');

  return (
    <S.Container>
      <S.HeaderWrapper>
        <NarrowMainHeader
          handleMenuOpenClick={openDrawer}
          handleLogoClick={() => {
            nav('/');
          }}
        />
      </S.HeaderWrapper>
      <S.DrawerWrapper>
        <Drawer handleDrawerClose={closeDrawer} placement="left" width="225px" ref={drawerRef}>
          <Dashboard />
        </Drawer>
      </S.DrawerWrapper>
      <ErrorBoundary>
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
