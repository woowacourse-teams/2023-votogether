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
  width: 90%;
  margin-top: 20px;

  font-size: 30px;
  font-weight: bold;
`;

export const InfoForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;

  width: 90%;
`;

export const TermsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const Label = styled.label`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;

  font: var(--text-body);

  p {
    font-weight: bold;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GenderLabel = styled.label`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 30px;

  margin-left: 20px;
`;

export const Input = styled.input`
  width: 70%;
  height: 20px;
  border: 1px solid #f2f2f2;
  padding: 20px;
`;

export const Radio = styled.input`
  font-size: 14px;
  font-weight: light;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;

  width: 90px;
  height: 50px;
  margin-left: 70%;
`;
