import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.section`
  display: none;

  @media (min-width: ${theme.breakpoint.lg}) {
    display: flex;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100vh;
  padding: 0 150px;

  color: #fff;
  background-color: #1f1f1f;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 65px;
`;

export const TitleText = styled.span`
  font-size: 3.6rem;
  font-weight: 700;
`;

export const IntroduceContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Introduce = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;

  height: max-content;
`;

export const PhoneImage = styled.img`
  height: 200px;

  object-fit: cover;

  @media (min-height: 600px) {
    height: 400px;
  }

  @media (min-height: 900px) {
    height: max-content;
  }
`;

export const Text = styled.span`
  font-size: 2rem;
  font-weight: 400;
`;

export const Decorator = styled.div`
  width: 16px;
  height: 100vh;

  &:nth-child(2) {
    background-color: #6d6d6d;
  }

  &:nth-child(3) {
    background-color: #8d8d8d;
  }

  &:last-child {
    background-color: #bcbcbc;
  }
`;
