import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const HeaderWrapper = styled.div`
  width: 100%;

  position: fixed;

  z-index: ${theme.zIndex.header};

  @media (min-width: ${theme.breakpoint.sm}) {
    display: none;
  }
`;

export const HeaderButton = styled.button`
  width: 30px;

  color: white;

  cursor: pointer;
`;

export const Form = styled.form``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 40px;

  width: 100%;
  padding: 70px 30px;

  box-sizing: border-box;

  @media (min-width: ${theme.breakpoint.sm}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: start;

    padding: 30px 70px;
  }
`;

export const Title = styled.input`
  padding: 10px;

  color: gray;

  font: var(--text-title);

  @media (min-width: ${theme.breakpoint.md}) {
    font-size: 2.4rem;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    font-size: 2.8rem;
  }
`;

export const Content = styled.textarea`
  padding: 10px;

  height: 300px;

  color: gray;

  font: var(--text-caption);
  font-family: 'Raleway', sans-serif;

  @media (min-width: ${theme.breakpoint.md}) {
    font-size: 1.8rem;
    height: 470px;
  }

  @media (min-width: ${theme.breakpoint.lg}) {
    height: 670px;
    font-size: 2rem;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;

  width: 100%;
  height: 100%;

  @media (min-width: ${theme.breakpoint.sm}) {
    max-width: 400px;

    margin-top: 40px;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;

  width: 100%;
`;

export const OptionListWrapper = styled.div`
  width: 100%;

  overflow-x: hidden;

  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  @media (min-width: ${theme.breakpoint.sm}) {
    height: 460px;

    overflow-y: auto;
  }
`;

export const Deadline = styled.p`
  font: var(--text-body);
  font-weight: bold;
  text-align: center;
`;

export const Description = styled.div`
  color: gray;

  font: var(--text-small);
`;

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 46px);
  gap: 10px;

  margin-bottom: 30px;
`;

export const SaveButtonWrapper = styled.div`
  display: none;
  visibility: hidden;

  @media (min-width: ${theme.breakpoint.sm}) {
    display: flex;
    visibility: visible;
    width: 100%;
    height: 60px;

    margin-top: 40px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font: var(--text-body);
  font-weight: bold;
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 20px;

  background: white;

  font: var(--text-body);

  cursor: pointer;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  align-items: center;
  gap: 10px;

  padding: 10px 0;

  font: var(--text-caption);
`;

export const ResetButtonWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50%;
  height: 40px;
`;
