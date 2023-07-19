import { keyframes, styled } from 'styled-components';

import { theme } from '@styles/theme';

const skeletonGradient = keyframes`
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }
    
    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
`;

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

  -webkit-animation: ${skeletonGradient} 1.8s infinite ease-in-out;
  animation: ${skeletonGradient} 1.8s infinite ease-in-out;
`;

export const FirstBox = styled(Box)`
  height: 110px;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 140px;
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
