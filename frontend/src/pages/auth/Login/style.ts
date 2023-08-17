import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${theme.breakpoint.lg}) {
    grid-template-columns: 1fr minmax(200px, 400px);
  }
`;
