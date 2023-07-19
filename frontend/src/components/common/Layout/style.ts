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

export const MainContainer = styled.main<{ $isVisibleCategory: boolean }>`
  display: flex;
  justify-content: center;

  width: 100%;
  @media (min-width: ${theme.breakpoint.sm}) {
    padding-left: ${({ $isVisibleCategory }) => $isVisibleCategory && '225px'};
  }
`;

export const ChildrenWrapper = styled.div<{ $isVisibleCategory: boolean }>`
  width: 100%;
  max-width: ${({ $isVisibleCategory }) => $isVisibleCategory && '500px'};
`;
