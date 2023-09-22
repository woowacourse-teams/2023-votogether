import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextArea = styled.textarea`
  height: 120px;
  padding: 12px;
  border: 1px solid var(--primary-color);
  border-radius: 6px;

  font: var(--text-caption);
  font-weight: 400;
  line-height: 2.4rem;

  resize: none;

  &::placeholder {
    font-size: 14px;
  }

  @media (max-width: ${theme.breakpoint.sm}) {
    &::placeholder {
      font-size: 12px;
      line-height: 2rem;
    }
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 160px;

    font: var(--text-body);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;

  padding-top: 20px;
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 40px;

  font: var(--text-caption);
  font-weight: 600;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 46px;

    font: var(--text-body);
  }
`;
