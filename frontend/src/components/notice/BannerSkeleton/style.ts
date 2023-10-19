import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Box = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 7px;

  background-color: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;

  animation: 1.7s ${theme.animation.skeletonGradientWave} linear infinite;
`;
