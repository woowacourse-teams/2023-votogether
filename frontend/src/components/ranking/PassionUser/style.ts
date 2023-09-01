import { styled } from 'styled-components';

export const Table = styled.table`
  width: 100%;

  font: var(--text-caption);
  text-align: center;

  & > :last-child {
    margin-top: 20px;
    padding: 3px 0;

    background-color: var(--white);

    font-weight: 500;
  }
`;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1fr 1fr 1fr;
`;

export const Th = styled.th`
  font: var(--text-body);
  padding: 10px 0;
`;

export const Td = styled.td`
  padding: 5px 0;
`;
