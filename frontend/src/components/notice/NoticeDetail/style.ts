import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 600px;
  padding-top: 48px;

  @media (min-width: ${theme.breakpoint.sm}) {
    padding-top: 30px;
  }
`;

export const Category = styled.span`
  font: var(--text-body);
`;

export const Title = styled.h1`
  margin-top: 20px;

  font: var(--text-title);
`;

export const CreatedAt = styled.span`
  margin: 20px 0;

  font: var(--text-body);
  font-size: 1.4rem;
  text-align: right;

  color: var(--text-dark-gray);
`;

export const Content = styled.p`
  font: var(--text-body);

  white-space: pre-wrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  margin-top: 50px;

  @media (min-width: ${theme.breakpoint.sm}) {
    flex-direction: row;
    gap: 80px;

    padding: 0 100px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 140px;
    height: 60px;

    white-space: pre-wrap;
  }
`;