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

  width: 100%;
  @media (min-width: ${theme.breakpoint.sm}) {
    padding-left: ${({ $isSidebarVisible }) => $isSidebarVisible && '225px'};
  }
`;

export const ChildrenWrapper = styled.div<{ $isSidebarVisible: boolean }>`
  width: 100%;
  max-width: ${({ $isSidebarVisible }) => $isSidebarVisible && '700px'};
`;
