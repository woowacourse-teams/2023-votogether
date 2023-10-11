import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;
