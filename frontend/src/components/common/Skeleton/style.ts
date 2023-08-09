import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

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
  height: ${props => (props.$isLarge ? '250px' : '110px')};

  @media (min-width: ${theme.breakpoint.sm}) {
    height: ${props => (props.$isLarge ? '280px' : '140px')};
  }
`;

export const SecondBox = styled(Box)`
  height: 20px;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 30px;
  }
`;

export const ThirdBox = styled(Box)`
  height: 10px;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 15px;
  }
`;
