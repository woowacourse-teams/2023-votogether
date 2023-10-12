import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  padding-top: 55px;
  position: relative;

  @media (min-width: 768px) {
    padding-top: 20px;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    padding-top: 20px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const ProfileSection = styled.section`
  width: 90%;
`;

export const UserControlSection = styled.section`
  width: 90%;
`;

export const DescribeUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 0 0 20px 5px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  width: 90%;
  margin: 40px 20px 0px 16px;

  font: var(--text-caption);
`;

export const ModalTitle = styled.div`
  font: var(--text-title);
`;

export const ModalDescription = styled.div`
  color: gray;
  font-size: 16px;
`;

export const ButtonListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;

  width: 90%;
  height: 50px;
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 50px;
`;