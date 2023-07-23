import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Web = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: block;
  }
`;

export const Mobile = styled.div`
  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;
