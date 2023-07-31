import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  padding-top: 70px;
  position: relative;
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};
`;

export const ProfileSection = styled.section`
  width: 90%;
`;

export const UserControlSection = styled.section`
  width: 90%;
`;

export const ButtonWrapper = styled.div`
  width: 90px;
  height: 50px;
`;

export const Input = styled.input`
  width: 80%;
  border: 1px solid #f2f2f2;
  padding: 20px;
`;
