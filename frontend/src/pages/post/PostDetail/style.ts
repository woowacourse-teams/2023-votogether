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
