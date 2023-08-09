import { keyframes, styled } from 'styled-components';

import { Size } from '@type/style';

import { theme } from '@styles/theme';

import { POSITION, SQUARE_SIZE } from '../ToastNSnackBarStyle';

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
  grid-template-rows: ${props => POSITION[props.$position]};
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

  width: ${props => SQUARE_SIZE[props.$size].width};
  height: ${props => SQUARE_SIZE[props.$size].height};
  border: 2px solid var(--primary-color);
  border-radius: 4px;

  background-color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInAnimation} ease-in-out 0.3s;

  z-index: ${theme.zIndex.modal};
`;
