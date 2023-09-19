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
  position: fixed;
  left: 50%; /* 화면 좌측에서 가로 중앙으로 이동 */
  transform: translateX(-50%); /* 가로 방향으로 중앙 정렬 */

  top: ${props => POSITION[props.$position]};
`;

export const Content = styled.div<{ $size: Size | 'free' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => SQUARE_SIZE[props.$size].width};
  height: ${props => SQUARE_SIZE[props.$size].height};
  border-radius: 4px;

  background-color: rgba(0, 0, 0, 0.6);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${TOAST_TIME}s linear infinite;

  z-index: ${theme.zIndex.modal};
`;
