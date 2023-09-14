import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 240px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);

  position: fixed;
  bottom: 0;
  left: 0;

  background-color: white;

  z-index: ${theme.zIndex.modal};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: max-content;
  padding: 30px 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 50px;
`;

export const LogoImage = styled.img`
  border-radius: 16px;

  width: 80px;
  height: 80px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 24px;
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 10px;
`;

export const Title = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;

export const Description = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const CancelButton = styled.button`
  padding: 10px;

  position: relative;
  bottom: 10px;
  left: 10px;

  cursor: pointer;
`;

export const IconImage = styled.img`
  width: 24px;
  height: 24px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const UserButton = styled.button`
  align-self: end;

  border-radius: 6px;

  width: 100%;
  height: 40px;

  font-size: 1.6rem;
  font-weight: 500;

  color: white;

  cursor: pointer;

  &:nth-child(1) {
    background-color: #888888;
  }

  &:nth-child(2) {
    background-color: #5383ed;
  }
`;
