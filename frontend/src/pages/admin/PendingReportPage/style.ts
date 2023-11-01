import styled from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 15px;

  padding: 15px;

  @media (max-width: ${theme.breakpoint.sm}) {
    margin-top: 40px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;

  width: 62px;
  padding-right: 10px;

  position: fixed;
  left: 90%;
  bottom: 24px;

  @media (max-width: ${theme.breakpoint.sm}) {
    left: 83%;
  }

  @media (max-width: 281px) {
    left: 78%;
  }
`;
