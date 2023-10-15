import { CSSProperties, Suspense, useContext } from 'react';

import { AuthContext, useToggle } from '@hooks';

import { useReadLatestAlarm } from '@hooks/query/user/useReadLatestAlarm';
import { useDrawer } from '@hooks/useDrawer';

import ErrorBoundary from '@pages/ErrorBoundary';

import AddButton from '@components/common/AddButton';
import AlarmContainer from '@components/common/AlarmContainer';
import AppInstallPrompt from '@components/common/AppInstallPrompt';
import Banner from '@components/common/Banner';
import Dashboard from '@components/common/Dashboard';
import Drawer from '@components/common/Drawer';
import Layout from '@components/common/Layout';
import NarrowMainHeader from '@components/common/NarrowMainHeader';
import Skeleton from '@components/common/Skeleton';
import UpButton from '@components/common/UpButton';
import PostList from '@components/post/PostList';

import { PATH } from '@constants/path';
import { APP_LAUNCH_EVENT } from '@constants/policyMessage';

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
  const { TITLE, CONTENT } = APP_LAUNCH_EVENT;

  const { isOpen: isBannerOpen, closeComponent: closeBanner } = useToggle(true);

  const loggedInfo = useContext(AuthContext).loggedInfo;
  const isAlarmActive = loggedInfo.userInfo?.hasLatestAlarm;
  const { mutate } = useReadLatestAlarm();

  const handleToolTipOpen = () => {
    if (!loggedInfo.isLoggedIn) return;

    openAlarmDrawer();
    mutate();
  };

  return (
    <Layout isSidebarVisible={true} isMobileDefaultHeaderVisible={false}>
      <S.Container>
        <S.HeaderWrapper>
          <NarrowMainHeader
            handleCategoryOpenClick={openCategoryDrawer}
            handleAlarmOpenClick={handleToolTipOpen}
            isAlarmActive={isAlarmActive ?? false}
          />
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
          <Drawer
            handleDrawerClose={closeCategoryDrawer}
            placement="left"
            width="225px"
            ref={categoryDrawerRdf}
          >
            <Dashboard />
          </Drawer>
          <Drawer
            handleDrawerClose={closeAlarmDrawer}
            placement="right"
            width="310px"
            ref={alarmDrawerRef}
          >
            <AlarmContainer closeToolTip={closeAlarmDrawer} style={alarmDrawerStyle} />
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
      <AppInstallPrompt />
    </Layout>
  );
}
