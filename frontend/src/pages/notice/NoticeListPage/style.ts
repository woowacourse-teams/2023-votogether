import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  padding: 0 30px 30px 30px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 0 0 30px 0;
  }
`;

export const Title = styled.span`
  font: var(--text-title);
  font-size: 2.4rem;
  text-align: center;

  padding: 48px 0;
`;

export const ButtonWrapper = styled.div`
  width: 80px;
  height: 46px;

  margin-top: 18px;
`;
