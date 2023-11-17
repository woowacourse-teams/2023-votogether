import { DefaultTheme, keyframes } from 'styled-components';

const breakpoint: Record<'sm' | 'md' | 'lg', `${number}px`> = {
  /** @media (min-width: 576px) { ... } */
  sm: '576px',
  /** @media (min-width: 768px) { ... } */
  md: '768px',
  /** @media (min-width: 1440px) { ... }*/
  lg: '1440px',
};

/**
 * 1 ~ 99: 본문 내 레어이
 * 100 ~ 199 : 본문을 제외한 페이지 내 레이어
 * 200 ~  : 페이지보다 상위 레이어
 */
const zIndex = {
  menu: 1,
  selector: 2,
  tagButton: 100,
  header: 101,
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
