import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const MainContainer = styled.main`
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

export const TagButtonWrapper = styled.div<{ $isWriter: boolean }>`
  position: fixed;
  top: 70px;
  right: 7%;

  @media (max-width: ${theme.breakpoint.sm}) {
    top: 55px;
    right: ${props => (props.$isWriter ? '28%' : '7%')};
  }

  z-index: ${theme.zIndex.tagButton};
`;
