import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.main`
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

  @media (min-width: ${theme.breakpoint.md}) {
    padding-top: 20px;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.md}) {
    display: none;
  }
`;

export const MainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  width: 90%;
`;

export const Title = styled.h1`
  width: 96%;

  font-size: 30px;
  font-weight: bold;
`;

export const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 90%;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
`;

export const Label = styled.label`
  font: var(--text-body);
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;

  width: 90px;
  height: 50px;
  margin-left: 70%;
`;

export const Input = styled.input`
  width: 80%;
  border: 1px solid #f2f2f2;
  padding: 20px;
`;
