import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Description = styled.p`
  margin-bottom: 44px;

  color: #67727e;

  font: var(--text-caption);
  white-space: pre-wrap;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;
