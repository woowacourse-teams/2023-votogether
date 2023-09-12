import { styled } from 'styled-components';

import { theme } from '@styles/theme';

interface ButtonProps {
  $theme: 'blank' | 'fill' | 'gray';
}

const BORDER_THEME: Record<ButtonProps['$theme'], string> = {
  fill: 'var(--primary-color)',
  blank: 'var(--primary-color)',
  gray: '#67727E',
};

const TEXT_THEME: Record<ButtonProps['$theme'], string> = {
  fill: 'white',
  blank: 'var(--primary-color)',
  gray: 'white',
};

const BACKGROUND_THEME: Record<ButtonProps['$theme'], string> = {
  fill: 'var(--primary-color)',
  blank: 'white',
  gray: '#67727E',
};

export const Button = styled.button<ButtonProps>`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid ${({ $theme }) => BORDER_THEME[$theme]};
  border-radius: 8px;

  color: ${({ $theme }) => TEXT_THEME[$theme]};
  background-color: ${({ $theme }) => BACKGROUND_THEME[$theme]};

  font: var(--text-caption);

  cursor: pointer;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;
