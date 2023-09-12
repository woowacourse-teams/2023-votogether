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

export const Description = styled.p`
  width: 90%;
  margin-top: 60px;

  font: var(--text-title);
  text-align: center;
`;

export const Text = styled.p`
  width: 90%;

  color: gray;

  font: var(--text-body);
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  width: 280px;
  height: 50px;
`;
