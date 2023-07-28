import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const TextArea = styled.textarea`
  height: 125px;
  padding: 12px;
  border: 1px solid var(--primary-color);
  border-radius: 6px;

  line-height: 2.4rem;

  resize: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;

  padding: 20px 0;
`;

export const ButtonWrapper = styled.div`
  width: 60px;
  height: 40px;
`;
