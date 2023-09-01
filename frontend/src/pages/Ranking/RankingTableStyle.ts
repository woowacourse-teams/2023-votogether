import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Background = styled.div`
  height: fit-content;
  border-radius: 6px;

  background-color: var(--gray);

  padding: 15px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 15px 15px;
  }
`;
