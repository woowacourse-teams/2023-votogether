import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 99999px;
`;

export const Dialog = styled.dialog`
  position: fixed;

  overflow: visible;

  z-index: ${theme.zIndex.modal};

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.35);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
