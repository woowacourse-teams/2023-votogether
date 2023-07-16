import { styled } from 'styled-components';

import { Size } from '@components/common/AddButton/type';

export const GraphContainer = styled.div<{ $size: Size }>`
  display: flex;

  height: ${props => (props.$size === 'sm' ? '200px' : props.$size === 'md' ? '230px' : '260px')};
  border: 1px solid red;

  font-size: 1.2rem;

  position: relative;

  @media (min-width: 576px) {
    font-size: 1.4rem;
  }
`;

export const Line = styled.div<{ $size: Size }>`
  border-bottom: 2px solid black;
  position: absolute;
  top: ${props => (props.$size === 'sm' ? '163px' : props.$size === 'md' ? '193px' : '223px')};
  width: 100%;
`;
