import { PropsWithChildren, useEffect } from 'react';

import ChannelTalk from '@components/ChannelTalk';
import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  isSidebarVisible: boolean;
  isChannelTalkVisible?: boolean;
}

export default function Layout({
  children,
  isSidebarVisible,
  isChannelTalkVisible = true,
}: LayoutProps) {
  useEffect(() => {
    isChannelTalkVisible ? ChannelTalk.showChannelButton() : ChannelTalk.hideChannelButton();
  }, [isChannelTalkVisible]);

  return (
    <S.Container>
      <S.WideHeaderWrapper>
        <WideHeader />
      </S.WideHeaderWrapper>
      <S.ContentContainer>
        {isSidebarVisible && (
          <S.DashboardWrapper>
            <Dashboard />
          </S.DashboardWrapper>
        )}
        <S.MainContainer $isSidebarVisible={isSidebarVisible}>
          <S.ChildrenWrapper $isSidebarVisible={isSidebarVisible}>{children}</S.ChildrenWrapper>
        </S.MainContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
