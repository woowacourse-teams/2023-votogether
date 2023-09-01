import { styled } from 'styled-components';

export const Table = styled.table`
  width: 100%;

  font: var(--text-caption);
  text-align: center;
`;

export const Tr = styled.tr`
  display: grid;
  grid-template-columns: 0.5fr 1fr 3fr 1fr;
`;

export const Th = styled.th`
  padding: 10px 0;

  font: var(--text-body);
`;

export const Td = styled.td`
  padding: 5px 0;

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
