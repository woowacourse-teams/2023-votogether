import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const VoteOptionListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  @media (${theme.breakpoint.md}) {
    gap: 18px;
  }
`;
