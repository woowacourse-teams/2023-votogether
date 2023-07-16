import { styled } from 'styled-components';

export const Dialog = styled.dialog<{
  $width: string;
  $placement: 'left' | 'right';
}>`
  width: ${({ $width }) => $width};
  height: 100vh;

  position: fixed;
  left: ${({ $placement }) => ($placement === 'left' ? '0' : 'auto')};
  right: ${({ $placement }) => ($placement === 'right' ? '0' : 'auto')};

  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  z-index: 999;
  &::backdrop {
    background-color: rgba(0, 0, 0, 0.35);
  }
`;
