import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 225px;
  height: 100vh;
  padding: 20px;
  border-right: 2px solid var(--gray);

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 100%;
  }
`;

export const CategorySectionWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 40px;

  position: absolute;
  bottom: 30px;
`;
