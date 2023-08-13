import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  padding: 50px 10px 20px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 30px 40px 20px 40px;
  }

  @media (min-width: ${theme.breakpoint.md}) {
    padding: 30px 80px 20px 80px;
  }
`;
