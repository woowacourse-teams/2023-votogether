import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  margin: 50px 10px 20px 10px;
  position: relative;

  @media (min-width: ${theme.breakpoint.sm}) {
    margin-top: 10px;
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

export const BannerWrapper = styled.div`
  width: 100%;

  margin-bottom: 10px;
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

export const AddButtonWrapper = styled(Link)`
  text-decoration: none;
`;
