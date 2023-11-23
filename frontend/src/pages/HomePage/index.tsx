import { CSSProperties, Suspense, useContext, useEffect } from 'react';

import {
  AuthContext,
  PostOptionContext,
  ToastContext,
  useCategoryList,
  usePostRequestInfo,
} from '@hooks';

import { useReadLatestAlarm } from '@hooks/query/user/useReadLatestAlarm';
import { useBannerToggle } from '@hooks/useBannerToggle';
import { useDrawer } from '@hooks/useDrawer';

import NoRenderErrorBoundary from '@pages/NoRenderErrorBoundary';

import AlarmContainer from '@components/AlarmContainer';
import AddButton from '@components/common/AddButton';
import AppInstallPrompt from '@components/common/AppInstallPrompt';
import Dashboard from '@components/common/Dashboard';
import Drawer from '@components/common/Drawer';
import DrawerToastWrapper from '@components/common/Drawer/DrawerToastWrapper';
import Layout from '@components/common/Layout';
import NarrowMainHeader from '@components/common/NarrowMainHeader';
import UpButton from '@components/common/UpButton';
import BannerFetcher from '@components/notice/BannerFetcher';
import BannerSkeleton from '@components/notice/BannerSkeleton';
import PostList from '@components/post/PostList';

import { PATH } from '@constants/path';

import { getSelectedPostListState } from '@utils/post/getSelectedPostListState';
import { smoothScrollToTop } from '@utils/scrollToTop';

import * as S from './style';

// 70px = 토글 스위치의 크기(40px) 및 상하 padding(각 10px), gap(10px)
const alarmDrawerStyle: CSSProperties = {
  height: 'calc(100vh - 70px)',
};

export default function HomePage() {
  const {
    drawerRef: categoryDrawerRdf,
    openDrawer: openCategoryDrawer,
    closeDrawer: closeCategoryDrawer,
  } = useDrawer('left');
  const {
    drawerRef: alarmDrawerRef,
    openDrawer: openAlarmDrawer,
    closeDrawer: closeAlarmDrawer,
  } = useDrawer('right');

  const { setElementId } = useContext(ToastContext);
  const { isBannerOpen, closeBanner } = useBannerToggle();
  const { addMessage } = useContext(ToastContext);
  const loggedInfo = useContext(AuthContext).loggedInfo;
  const isAlarmActive = loggedInfo.userInfo?.hasLatestAlarm;
  const { mutate } = useReadLatestAlarm();

  const handleToolTipOpen = () => {
    if (!loggedInfo.isLoggedIn) return addMessage('알림은 로그인 후 이용할 수 있습니다.');

    openAlarmDrawer();
    setElementId('drawer-alarm-toast-content');
    mutate();
  };

  const { postOption, setPostOption } = useContext(PostOptionContext);
  const { postOptionalOption, postType } = usePostRequestInfo();
  const { categoryId } = postOptionalOption;

  const { data: categoryList } = useCategoryList(false);
  const categoryListFallback = categoryList ?? [];
  const selectedState = getSelectedPostListState({
    categoryId,
    categoryList: categoryListFallback,
    postType,
  });

  useEffect(() => {
    setPostOption({ ...postOption, type: selectedState });
  }, [selectedState]);

  const handleAlarmDrawerClose = () => {
    closeAlarmDrawer();
    setElementId('toast-content');
  };

  const handleCategoryDrawerOpen = () => {
    openCategoryDrawer();
    setElementId('drawer-category-toast-content');
  };

  const handleCategoryDrawerClose = () => {
    closeCategoryDrawer();
    setElementId('toast-content');
  };

  return (
    <Layout isSidebarVisible={true} isMobileDefaultHeaderVisible={false}>
      <S.Container>
        <S.HeaderWrapper>
          <NarrowMainHeader
            handleCategoryOpenClick={handleCategoryDrawerOpen}
            handleAlarmOpenClick={handleToolTipOpen}
            isAlarmActive={isAlarmActive ?? false}
          />
        </S.HeaderWrapper>
        {isBannerOpen && (
          <S.BannerWrapper>
            <NoRenderErrorBoundary>
              <Suspense fallback={<BannerSkeleton />}>
                <BannerFetcher handleClose={closeBanner} />
              </Suspense>
            </NoRenderErrorBoundary>
          </S.BannerWrapper>
        )}
        <S.DrawerWrapper>
          <Drawer
            handleDrawerClose={handleCategoryDrawerClose}
            placement="left"
            width="225px"
            ref={categoryDrawerRdf}
          >
            <DrawerToastWrapper placement="left" id="drawer-category-toast-content" />
            <Dashboard />
          </Drawer>
          <Drawer
            handleDrawerClose={handleAlarmDrawerClose}
            placement="right"
            width="310px"
            ref={alarmDrawerRef}
          >
            <DrawerToastWrapper id="drawer-alarm-toast-content" placement="right" />
            {loggedInfo.isLoggedIn && (
              <AlarmContainer closeToolTip={handleAlarmDrawerClose} style={alarmDrawerStyle} />
            )}
          </Drawer>
        </S.DrawerWrapper>
        <PostList />
        <S.ButtonContainer>
          <UpButton onClick={smoothScrollToTop} />
          <S.AddButtonWrapper to={PATH.POST_WRITE}>
            <AddButton size="lg" aria-label="게시글 작성 페이지로 이동" />
          </S.AddButtonWrapper>
        </S.ButtonContainer>
      </S.Container>
      <AppInstallPrompt />
    </Layout>
  );
}
