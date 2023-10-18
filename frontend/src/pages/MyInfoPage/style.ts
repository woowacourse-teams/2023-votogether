import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  position: relative;
  padding: 55px 30px 0 30px;

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
  width: 100%;
`;

export const UserControlSection = styled.section`
  width: 100%;
`;

export const NoticeWrapper = styled.div`
  width: 100%;

  font: var(--text-caption);
`;

export const NoticeTitle = styled(Link)`
  display: flex;
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 7px;
  padding: 16px;

  background-color: #ffffff;

  &:hover {
    background-color: #f2f2f2;
  }
  cursor: pointer;
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AdminButtonWrapper = styled.div`
  width: 150px;
  height: 60px;

  white-space: pre-wrap;
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 50px;
`;
