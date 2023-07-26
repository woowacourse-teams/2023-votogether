import { DefaultTheme } from 'styled-components';

const breakpoint = {
  /** @media (min-width: 576px) { ... } */
  sm: '576px',
  /** @media (min-width: 960px) { ... } */
  md: '960px',
  /** @media (min-width: 1440px) { ... }*/
  lg: '1440px',
};
const zIndex = {
  header: 100,
  modal: 200,
};

export type ZIndex = typeof zIndex;
export type Breakpoint = typeof breakpoint;

export const theme: DefaultTheme = {
  breakpoint,
  zIndex,
};
