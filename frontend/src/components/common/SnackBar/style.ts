import { keyframes, styled } from 'styled-components';

import { Size } from '@type/style';

import { theme } from '@styles/theme';

const position = {
  top: '25%',
  bottom: '85%',
};

const squareSize = {
  sm: { width: '250px', height: '40px' },
  md: { width: '400px', height: '40px' },
  lg: { width: '500px', height: '45px' },
  free: { width: '80%', height: '50px' },
};

const fadeInAnimation = keyframes`
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div<{ $position: 'top' | 'bottom' }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${props => position[props.$position]};
  align-items: end;
  justify-items: center;

  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
`;

export const Content = styled.div<{ $size: Size | 'free'; $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => squareSize[props.$size].width};
  height: ${props => squareSize[props.$size].height};
  border: 2px solid var(--primary-color);
  border-radius: 4px;

  background-color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInAnimation} ease-in-out 0.3s;

  z-index: ${theme.zIndex.modal};
`;
