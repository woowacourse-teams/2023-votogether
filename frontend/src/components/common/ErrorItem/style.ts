import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  position: relative;

  margin: 70px 10px 20px 10px;
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

  color: rgba(0, 0, 0, 0.7);

  font-size: 20px;
  font-weight: bold;

  text-align: center;
  word-break: keep-all;
`;

export const Description = styled.p`
  width: 90%;
  margin-bottom: 50px;

  color: gray;

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
  font: var(--text-body);
  font-weight: bold;
`;

export const ButtonWrapper = styled.div`
  width: 140px;
  height: 50px;
`;

export const Text = styled.p`
  width: 90%;

  color: gray;

  font: var(--text-body);
  text-align: center;
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;

  position: relative;
  top: 2px;

  margin-right: 4px;
`;

export const RetryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;

  gap: 20px;
`;
