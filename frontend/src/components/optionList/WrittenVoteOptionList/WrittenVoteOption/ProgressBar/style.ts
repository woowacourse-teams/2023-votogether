import { styled } from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;

  height: 8px;

  background-color: rgba(0, 0, 0, 0.15);
`;

export const Bar = styled.div<{ $progress: number; $isSelected: boolean }>`
  border-radius: 4px;

  width: ${({ $progress }) => `${$progress}%`};
  height: 8px;

  background-color: ${({ $isSelected }) => ($isSelected ? 'var(--primary-color)' : '#9F9F9F')};
`;
