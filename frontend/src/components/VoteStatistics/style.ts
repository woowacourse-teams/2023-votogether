import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

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

export const GenderExplain = styled.span`
  display: flex;
  gap: 10px;

  height: 20px;

  & > * {
    display: flex;
    align-items: center;
    gap: 3px;

    line-height: initial;
  }
`;

type Gender = 'FEMALE' | 'MALE';

const GENDER_COLOR: Record<Gender, string> = {
  FEMALE: 'var(--graph-color-purple)',
  MALE: 'var(--graph-color-green)',
};

export const ColorIcon = styled.span<{ $gender: Gender }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background-color: ${props => GENDER_COLOR[props.$gender]};
`;
