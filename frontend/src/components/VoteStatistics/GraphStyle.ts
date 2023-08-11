import { styled } from 'styled-components';

import { Size } from '@type/style';

import { theme } from '@styles/theme';

import { Gender } from './type';

export const GENDER_COLOR: Record<Gender, string> = {
  FEMALE: 'var(--graph-color-purple)',
  MALE: 'var(--graph-color-green)',
};

const SIZE: Record<Size, { height: string; linePositionTop: string }> = {
  sm: { height: '200px', linePositionTop: '165px' },
  md: { height: '230px', linePositionTop: '194px' },
  lg: { height: '260px', linePositionTop: '224px' },
};

export const GraphContainer = styled.div<{ $size: Size }>`
  display: flex;

  height: ${props => `${SIZE[props.$size].height}`};

  position: relative;

  font: var(--text-small);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const Line = styled.div<{ $size: Size }>`
  width: 100%;
  border-bottom: 2px solid black;

  position: absolute;
  top: ${props => `${SIZE[props.$size].linePositionTop}`};
`;
