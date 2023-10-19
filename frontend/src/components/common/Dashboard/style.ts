import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 225px;
  height: 100vh;
  padding: 20px;
  border-right: 2px solid var(--bright-gray);

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 100%;
  }
`;

export const NoticeListLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  right: 6px;
  width: 100%;
  margin-top: 18px;
  font: var(--text-body);
`;

export const Image = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 10px;
`;

export const CategorySectionWrapper = styled.div`
  width: 100%;
  margin-top: 25px;
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 40px;

  position: absolute;
  bottom: 30px;
`;
