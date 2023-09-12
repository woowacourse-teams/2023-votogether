import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  padding-top: 55px;
  position: relative;

  @media (min-width: 768px) {
    padding-top: 20px;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    padding-top: 20px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  gap: 20px;

  width: 90%;
`;

export const Title = styled.h1`
  width: 90%;
  margin-top: 20px;

  font-size: 20px;
  font-weight: bold;
`;

export const Content = styled.p`
  font: var(--text-body);
`;

export const ButtonWrapper = styled.div`
  display: flex;

  width: 100%;
  height: 50px;

  padding: 8px;
`;
