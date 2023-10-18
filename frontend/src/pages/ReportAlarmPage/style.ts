import { styled } from 'styled-components';

import { theme } from '@styles/theme';

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

  margin: 20px 0;
  padding: 0 15px;
`;
