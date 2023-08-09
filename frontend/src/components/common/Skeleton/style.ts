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

  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.7s ${theme.animation.skeletonGradientWave} linear infinite;
`;

export const FirstBox = styled(Box)<{ $isLarge: boolean }>`
  height: ${props => (props.$isLarge ? '110px' : '250px')};

  @media (min-width: ${theme.breakpoint.sm}) {
    height: ${props => (props.$isLarge ? '110px' : '290px')};
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
