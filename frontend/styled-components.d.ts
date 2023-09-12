import { Animation, Breakpoint, ZIndex } from '@styles/theme';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    breakpoint: Breakpoint;
    zIndex: ZIndex;
    animation: Animation;
  }
}
