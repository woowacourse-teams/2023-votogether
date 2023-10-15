import { keyframes, styled } from 'styled-components';

import { Size } from '@type/style';

import { TOAST_TIME } from '@constants/animation';

import { SQUARE_SIZE } from '../ToastNSnackBarStyle';

export const fadeInOutAnimation = keyframes`
  0%, 100%{
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
`;

export const Content = styled.div<{ $size: Size | 'free'; $isShown: boolean }>`
  display: ${props => (props.$isShown ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  width: ${props => SQUARE_SIZE[props.$size].width};
  min-height: ${props => SQUARE_SIZE[props.$size].height};
  border-radius: 4px;
  padding: 10px 15px;

  background-color: rgba(0, 0, 0, 0.6);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${TOAST_TIME}ms linear infinite;
`;
