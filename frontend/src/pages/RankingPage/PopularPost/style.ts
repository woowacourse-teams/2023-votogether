import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Table = styled.table`
  width: 100%;

  font: var(--text-default);
  text-align: center;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 0.8fr 1fr 3fr 1fr;
  align-items: center;
`;

export const Td = styled.td`
  padding: 10px 0;

  > a {
    display: -webkit-box;

    text-decoration-line: underline;
    text-underline-offset: 0.2em;
    text-overflow: ellipsis;
    word-break: break-word;

    overflow: hidden;

    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
