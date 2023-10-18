import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Dialog = styled.dialog`
  position: fixed;

  margin: auto;

  overflow: visible;

  background: none;

  z-index: ${theme.zIndex.modal};

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.35);
  }
`;

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
`;

export const HiddenCloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 99999px;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -50px;
  left: 0;
  right: 0;

  width: fit-content;
  margin: 0 auto;
  padding: 8px;
  border-radius: 50%;

  transition: background-color 0.2s ease-in-out;

  background-color: rgba(255, 255, 255, 0.7);

  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 80vh;

  object-fit: contain;
`;
