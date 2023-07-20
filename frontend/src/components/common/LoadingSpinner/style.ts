import { keyframes, styled } from 'styled-components';

import { Size } from '@type/style';

interface LoadingSpinnerProps {
  $size: Size;
}

const SIZE = {
  sm: '10px',
  md: '15px',
  lg: '30px',
};

const Animation = keyframes`
to {
  transform: translate(0, -15px);
}
`;

export const Container = styled.div<LoadingSpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  & > :nth-child(2) {
    animation-delay: 0.1s;
    margin: 0 ${props => SIZE[props.$size]};
  }

  & > :nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export const Unit = styled.div<LoadingSpinnerProps>`
  width: ${props => SIZE[props.$size]};
  height: ${props => SIZE[props.$size]};
  border-radius: 50%;

  background-color: #747474;

  animation: ${Animation} 0.5s ease-in-out infinite alternate;
`;
