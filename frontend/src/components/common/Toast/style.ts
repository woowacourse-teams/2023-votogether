import { keyframes, styled } from 'styled-components';

import { Size } from '@type/style';

import { TOAST_TIME } from '@constants/animation';

import { theme } from '@styles/theme';

import { POSITION, SQUARE_SIZE } from '../ToastNSnackBarStyle';

export const fadeInOutAnimation = keyframes`
  0%, 100%{
    opacity: 0;
  }
  10%, 90% {
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

export const Content = styled.div<{ $size: Size | 'free' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => SQUARE_SIZE[props.$size].width};
  height: ${props => SQUARE_SIZE[props.$size].height};
  border-radius: 4px;

  background-color: rgba(0, 0, 0, 0.5);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${TOAST_TIME}s linear infinite;

  z-index: ${theme.zIndex.modal};
`;
