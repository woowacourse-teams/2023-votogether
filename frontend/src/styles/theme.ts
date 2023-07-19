import { DefaultTheme } from 'styled-components';

const breakpoint = {
  sm: '576px',
  // => @media (min-width: 576px) { ... }

  md: '960px',
  // => @media (min-width: 960px) { ... }

  lg: '1440px',
  // => @media (min-width: 1440px) { ... }
};

const zIndex = {
  header: 100,
  modal: 200,
};

export const theme: DefaultTheme = {
  breakpoint,
  zIndex,
};
