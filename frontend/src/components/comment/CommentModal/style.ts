import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
  padding: 0 12px;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);

  z-index: ${theme.zIndex.modal};

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 0;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;

  background-color: white;
`;

export const Title = styled.span`
  margin-bottom: 32px;

  color: #334253;

  font: var(--text-title);
  font-weight: 500;

  @media (min-width: ${theme.breakpoint.sm}) {
    font-size: 2.4rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;

  @media (min-width: ${theme.breakpoint.sm}) {
    gap: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 44px;
`;
