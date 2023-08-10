import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  position: relative;
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};
`;

export const Title = styled.h1`
  width: 90%;

  font-size: 60px;
  text-align: center;

  margin-top: 60px;
`;

export const Description = styled.p`
  width: 90%;

  font: var(--text-title);
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  width: 120px;
  height: 50px;
`;
