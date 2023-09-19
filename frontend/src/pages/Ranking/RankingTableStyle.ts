import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: fit-content;
  min-height: 500px;
  border-radius: 4px;

  background-color: var(--gray);

  padding: 15px 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 15px 15px;
  }
`;
