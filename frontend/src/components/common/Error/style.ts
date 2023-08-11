import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

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
  margin-top: 60px;

  font-size: 20px;
  text-align: center;
`;

export const Description = styled.p`
  width: 90%;
  margin: 20px 0;

  font: var(--text-body);
  text-align: center;
`;

export const Direction = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  font: var(--text-body);
  text-decoration: underline;

  cursor: pointer;
`;

export const RetryText = styled.p`
  color: gray;
  font: var(--text-caption);
`;

export const ButtonWrapper = styled.div`
  width: 120px;
  height: 50px;
`;
