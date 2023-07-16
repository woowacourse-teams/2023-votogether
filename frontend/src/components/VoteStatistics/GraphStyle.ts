import { styled } from 'styled-components';

import { Size } from '@components/common/AddButton/type';

export const GraphContainer = styled.div<{ $size: Size }>`
  display: flex;

  height: ${props => (props.$size === 'sm' ? '200px' : props.$size === 'md' ? '230px' : '260px')};

  position: relative;

  font-size: 1.2rem;

  @media (min-width: 576px) {
    font-size: 1.4rem;
  }
`;

export const Line = styled.div<{ $size: Size }>`
  width: 100%;
  border-bottom: 2px solid black;

  position: absolute;
  top: ${props => (props.$size === 'sm' ? '165px' : props.$size === 'md' ? '194px' : '224px')};
`;
