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

  @media (max-width: 375px) {
    margin-top: 30px;
  }

  @media (max-width: 375px) and (min-width: 280px) {
    margin-top: 0;
  }
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

  @media (max-width: 376px) {
    margin-bottom: 20px;
  }
`;

export const LogoImage = styled.img`
  border-radius: 16px;

  width: 80px;
  height: 80px;

  @media (max-width: 375px) and (min-width: 280px) {
    width: 50px;
    height: 50px;
  }
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

  @media (max-width: 375px) and (min-width: 280px) {
    font: var(--text-default);
  }
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

  @media (max-width: 375px) and (min-width: 280px) {
    width: 18px;
    height: 18px;
  }
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: end;
  gap: 8px;
`;
