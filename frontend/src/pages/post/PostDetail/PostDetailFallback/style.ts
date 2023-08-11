import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const SkeletonWrapper = styled.div`
  margin-top: 70px;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 30px;
  }
`;

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;
