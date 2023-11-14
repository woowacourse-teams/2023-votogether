import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 99999px;
`;

export const Dialog = styled.dialog<{
  $width: string;
  $placement: 'left' | 'right';
}>`
  width: ${({ $width }) => $width};
  min-height: 100%;

  position: fixed;
  top: 0;
  left: ${({ $placement }) => ($placement === 'left' ? '0' : 'auto')};
  right: ${({ $placement }) => ($placement === 'right' ? '0' : 'auto')};

  overflow: visible;

  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  z-index: ${theme.zIndex.modal};

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.35);
  }
`;
