import { DefaultTheme, keyframes } from 'styled-components';

const breakpoint: Record<'sm' | 'md' | 'lg', `${number}px`> = {
  /** @media (min-width: 576px) { ... } */
  sm: '576px',
  /** @media (min-width: 768px) { ... } */
  md: '768px',
  /** @media (min-width: 1440px) { ... }*/
  lg: '1440px',
};

const zIndex = {
  select: 1,
  tagButton: 90,
  header: 100,
  modal: 200,
  toast: 300,
};

const animation = {
  skeletonGradientPulse: keyframes`
  0% {
      background-color: rgba(165, 165, 165, 0.1);
  }

  50% {
      background-color: rgba(165, 165, 165, 0.3);
  }
  
  100% {
      background-color: rgba(165, 165, 165, 0.1);
  }
  `,
  skeletonGradientWave: keyframes`
  to {
      background-position-x: -200%;
    }
  `,
};

export type ZIndex = typeof zIndex;
export type Breakpoint = typeof breakpoint;
export type Animation = typeof animation;

export const theme: DefaultTheme = {
  breakpoint,
  zIndex,
  animation,
};
