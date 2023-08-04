import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  font: var(--text-small);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const CategoryWrapper = styled.fieldset`
  display: flex;
  gap: 10px;
`;

export const RadioLabel = styled.label`
  display: flex;
  gap: 5px;
`;
