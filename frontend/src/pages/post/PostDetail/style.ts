import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 70px 10px 20px 10px;
`;

export const HeaderContainer = styled.div`
  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const TagButtonWrapper = styled.div`
  position: absolute;
  top: 55px;
`;

export const BottomButtonContainer = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: flex;
    width: 90%;
    height: 40px;
    margin-top: 40px;
    gap: 10px;
  }
`;
