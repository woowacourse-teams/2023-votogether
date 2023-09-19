import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  position: relative;
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.md}) {
    display: none;
  }
`;

export const Title = styled.h1`
  width: 90%;
  margin-top: 40px;

  font-size: 20px;
  font-weight: bold;

  text-align: center;
  word-break: keep-all;
`;

export const Description = styled.p`
  width: 90%;
  margin-bottom: 50px;

  font: var(--text-body);
  text-align: center;
  word-break: keep-all;
`;

export const Direction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const RetryText = styled.p`
  display: flex;
  justify-content: space-around;
  gap: 10px;

  padding: 12px;

  font: var(--text-body);
  font-weight: bold;
`;

export const ButtonWrapper = styled.div`
  width: 120px;
  height: 50px;
`;
