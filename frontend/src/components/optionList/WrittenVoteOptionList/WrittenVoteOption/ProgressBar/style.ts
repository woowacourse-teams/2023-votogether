import { styled } from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;

  height: 8px;

  background-color: rgba(0, 0, 0, 0.3);
`;

export const Bar = styled.div<{ progress: string; isSelect: boolean }>`
  border-radius: 4px;

  width: ${({ progress }) => progress};
  height: 8px;

  background-color: ${({ isSelect }) => (isSelect ? '#ff7877' : '#9F9F9F')};
`;
