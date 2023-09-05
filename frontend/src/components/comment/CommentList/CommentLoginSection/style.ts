import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 0 20px;

    font-size: 2.4rem;
  }
`;

export const Title = styled.span`
  font-size: 2.2rem;
  font-weight: 600;

  @media (min-width: ${theme.breakpoint.sm}) {
    font-size: 2.4rem;
  }
`;

export const SubTitle = styled.p`
  margin-top: 10px;

  font: var(--text-caption);
  font-weight: 400;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const LoginLink = styled(Link)`
  display: flex;
  justify-content: center;

  margin-top: 40px;
`;

export const Image = styled.img`
  width: 300px;
  height: 45px;
`;
