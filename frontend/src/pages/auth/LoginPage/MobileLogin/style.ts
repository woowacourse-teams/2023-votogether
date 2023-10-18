import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 36px;
`;

export const LogoTitle = styled.h1`
  margin-bottom: 140px;

  font-size: 3.2rem;
  font-weight: 700;
`;

export const LoginButton = styled.button`
  cursor: pointer;
`;

export const GuestButton = styled.button`
  margin-top: 30px;

  color: #9f9f9f;

  font: var(--text-caption);
  font-weight: 400;

  cursor: pointer;
`;

export const KaKaoImage = styled.img`
  width: 100%;
  height: 40px;
`;
