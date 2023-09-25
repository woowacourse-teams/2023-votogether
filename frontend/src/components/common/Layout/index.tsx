import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ChannelTalk from '@components/ChannelTalk';
import Dashboard from '@components/common/Dashboard';
import WideHeader from '@components/common/WideHeader';

import IconButton from '../IconButton';
import NarrowTemplateHeader from '../NarrowTemplateHeader';

import * as S from './style';

interface LayoutProps extends PropsWithChildren {
  isSidebarVisible: boolean;
  isChannelTalkVisible?: boolean;
  isMobileDefaultHeaderVisible?: boolean;
}

export default function Layout({
  children,
  isSidebarVisible,
  isMobileDefaultHeaderVisible = true,
  isChannelTalkVisible = true,
}: LayoutProps) {
  const navigate = useNavigate();
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
        {isMobileDefaultHeaderVisible && (
          <S.MobileHeaderWrapper>
            <NarrowTemplateHeader>
              <IconButton
                category="back"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </NarrowTemplateHeader>
          </S.MobileHeaderWrapper>
        )}
        <S.MainContainer $isSidebarVisible={isSidebarVisible}>
          <S.ChildrenWrapper $isSidebarVisible={isSidebarVisible}>{children}</S.ChildrenWrapper>
        </S.MainContainer>
      </S.ContentContainer>
    </S.Container>
  );
}
