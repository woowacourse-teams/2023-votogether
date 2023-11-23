import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextAreaWrapper = styled.div`
  height: 120px;
  padding-top: 12px;
  border: 1px solid var(--primary-color);
  border-radius: 6px;

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 160px;
  }
`;

export const TextArea = styled.textarea`
  height: 99%;
  width: 100%;
  padding: 12px;
  padding-top: 0px;
  border-radius: 6px;

  font: var(--text-caption);
  font-weight: 400;
  line-height: 2.4rem;

  resize: none;

  &::placeholder {
    font-size: 1.4rem;
  }

  @media (max-width: ${theme.breakpoint.sm}) {
    &::placeholder {
      font: var(--text-small);
    }
  }

  @media (min-width: ${theme.breakpoint.sm}) {
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

export const KeyDescription = styled.span`
  margin-top: 20px;

  text-align: right;
  font: var(--text-small);

  color: var(--dark-gray);

  @media (min-width: ${theme.breakpoint.sm}) {
    font-size: 1.4rem;
  }
`;
