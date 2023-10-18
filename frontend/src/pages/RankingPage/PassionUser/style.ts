import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Table = styled.table`
  width: 100%;

  font: var(--text-default);
  text-align: center;

  & > :nth-child(12) {
    margin-top: 20px;
    padding: 3px 0;
    border-radius: 4px;

    background-color: var(--white);

    font-weight: 500;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const Tbody = styled.tbody`
  & > :nth-child(11) {
    margin-top: 20px;
    padding: 3px 0;
    border-radius: 4px;

    background-color: var(--white);

    font-weight: 600;
  }
`;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr;
  align-items: center;
`;

export const Td = styled.td`
  padding: 10px 0;
`;
