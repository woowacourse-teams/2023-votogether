import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const TagButtonWrapper = styled.div`
  margin-right: 10px;

  position: absolute;
  top: 55px;
  right: 10px;
`;

export const MenuWrapper = styled.div`
  margin-right: 10px;

  position: absolute;
  top: 45px;
  right: 10px;

  z-index: ${theme.zIndex.modal};
`;
