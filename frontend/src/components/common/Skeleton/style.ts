import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  width: 100%;

  @media (min-width: ${theme.breakpoint.sm}) {
    gap: 12px;
  }
`;

const Box = styled.div`
  border-radius: 4px;

  background-color: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;

  animation: 1.7s ${theme.animation.skeletonGradientWave} linear infinite;
`;

export const FirstBox = styled(Box)<{ $isLarge: boolean }>`
  height: ${props => (props.$isLarge ? '40vh' : '30vh')};

  @media (min-width: ${theme.breakpoint.sm}) {
    height: ${props => (props.$isLarge ? '44vh' : '34vh')};
  }
`;

export const SecondBox = styled(Box)`
  height: 4vh;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 6vh;
  }
`;

export const ThirdBox = styled(Box)`
  height: 2vh;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 4vh;
  }
`;
