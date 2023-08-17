import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 70px 10px 20px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 30px;
  }
`;

export const BottomContainer = styled.div`
  margin: 10px;
  margin-bottom: 30px;
`;
