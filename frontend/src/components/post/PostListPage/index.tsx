import { Suspense } from 'react';

import { useDrawer } from '@hooks/useDrawer';
import { useToggle } from '@hooks/useToggle';

import ErrorBoundary from '@pages/ErrorBoundary';

import AddButton from '@components/common/AddButton';
import Banner from '@components/common/Banner';
import Dashboard from '@components/common/Dashboard';
import Drawer from '@components/common/Drawer';
import NarrowMainHeader from '@components/common/NarrowMainHeader';
import Skeleton from '@components/common/Skeleton';
import UpButton from '@components/common/UpButton';
import PostList from '@components/post/PostList';

import { APP_LAUNCH_EVENT } from '@constants/announcement';
import { PATH } from '@constants/path';

import { smoothScrollToTop } from '@utils/scrollToTop';

import * as S from './style';

export default function PostListPage() {
  const { drawerRef, closeDrawer, openDrawer } = useDrawer('left');
  const { TITLE, CONTENT } = APP_LAUNCH_EVENT;

  const { isOpen: isBannerOpen, closeComponent: closeBanner } = useToggle(true);

  return (
    <S.Container>
      <S.HeaderWrapper>
        <NarrowMainHeader handleMenuOpenClick={openDrawer} />
      </S.HeaderWrapper>
      {isBannerOpen && (
        <S.BannerWrapper>
          <Banner
            title={TITLE}
            content={CONTENT}
            handleClose={closeBanner}
            path={PATH.ANNOUNCEMENT}
          />
        </S.BannerWrapper>
      )}
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
        <UpButton onClick={smoothScrollToTop} />
        <S.AddButtonWrapper to={PATH.POST_WRITE}>
          <AddButton size="lg" aria-label="게시글 작성 페이지로 이동" />
        </S.AddButtonWrapper>
      </S.ButtonContainer>
    </S.Container>
  );
}
