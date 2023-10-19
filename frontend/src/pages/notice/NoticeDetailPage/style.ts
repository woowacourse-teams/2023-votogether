import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  padding: 48px 10px 30px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding-top: 30px;
  }
`;

export const Category = styled.span`
  font: var(--text-body);
`;
