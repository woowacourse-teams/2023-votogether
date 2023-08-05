import { keyframes, styled } from 'styled-components';

import { Size } from '@type/style';

import { toastTime } from '@constants/animation';

const squareSize = {
  sm: { width: '250px', height: '30px' },
  md: { width: '400px', height: '35px' },
  lg: { width: '500px', height: '40px' },
  free: { width: '80%', height: '40px' },
};

export const fadeInOutAnimation = keyframes`
  0%, 100%{
    opacity: 0;
  }
  10%, 90% {
    opacity: 1;
  }
`;

export const Wrapper = styled.div<{ $size: Size | 'free' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => squareSize[props.$size].width};
  height: ${props => squareSize[props.$size].height};
  border-radius: 4px;

  position: fixed;

  background-color: rgba(0, 0, 0, 0.5);
  color: var(--white);

  font: var(--text-caption);
  letter-spacing: 1px;

  animation: ${fadeInOutAnimation} ${toastTime}s linear infinite;
`;
