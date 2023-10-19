import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const ContentWrapper = styled.div`
  margin: 70px 10px 20px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 30px;
  }
`;
