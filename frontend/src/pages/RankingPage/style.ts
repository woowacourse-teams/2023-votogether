import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
  margin-bottom: 20px;

  & > * {
    width: 100%;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 30px;
  }
`;

export const PageHeader = styled.div`
  margin: 15px;

  text-align: center;
  font: var(--text-page-title);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-top: 10px;
  padding: 0 15px;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 20px;
  }
`;
