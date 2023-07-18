import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const HeaderWrapper = styled.div`
  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const PageHeader = styled.div`
  margin: 15px;
  font-size: 20px;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

export const LoadingWrapper = styled.div`
  height: 100px;

  display: flex;
`;
