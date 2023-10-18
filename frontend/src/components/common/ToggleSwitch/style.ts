import { styled } from 'styled-components';

import { Size } from '@type/style';

const SIZE = {
  sm: { height: '45px' },
  md: { height: '60px' },
  lg: { height: '80px' },
  free: { height: '100%' },
};

export const Wrapper = styled.div<{ $size: Size | 'free' }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;

  height: ${props => SIZE[props.$size].height};
  border: 1.5px solid var(--primary-color);
  border-radius: 4px;
`;

export const Content = styled.button<{ $isSelected: boolean }>`
  border-radius: 4px;

  height: calc(100% - 10px);
  width: calc(100% - 10px);

  background-color: ${props => props.$isSelected && 'var(--primary-color)'};
  color: ${props => (props.$isSelected ? 'white' : 'var(--primary-color)')};

  font: var(--text-caption);
  letter-spacing: 1px;

  cursor: pointer;
`;
