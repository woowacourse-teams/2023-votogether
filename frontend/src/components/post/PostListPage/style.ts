import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  padding-top: 55px;
  position: relative;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding-top: 0px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;
  top: 0;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`;

export const DrawerWrapper = styled.div`
  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
    visibility: hidden;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;

  position: sticky;

  bottom: 24px;

  will-change: transform;
`;

export const AddButtonWrapper = styled(Link)`
  text-decoration: none;
`;
