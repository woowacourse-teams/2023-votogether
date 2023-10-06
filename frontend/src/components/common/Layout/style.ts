import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding-top: 70px;
  }
`;

export const WideHeaderWrapper = styled.div`
  width: 100%;

  position: fixed;
  top: 0;

  z-index: ${theme.zIndex.header};

  @media (max-width: ${theme.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`;

export const DashboardWrapper = styled.aside`
  width: 225px;
  height: 90vh;

  position: fixed;
  left: 0;

  @media (max-width: ${theme.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`;

export const MainContainer = styled.main<{ $isSidebarVisible: boolean }>`
  display: flex;
  justify-content: center;

  margin-top: 15px;
  width: 100%;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 0;
    padding-left: ${({ $isSidebarVisible }) => $isSidebarVisible && '225px'};
  }
`;

export const ChildrenWrapper = styled.div<{ $isSidebarVisible: boolean }>`
  width: 100%;
  max-width: ${({ $isSidebarVisible }) => $isSidebarVisible && '700px'};
`;

export const MobileHeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;
