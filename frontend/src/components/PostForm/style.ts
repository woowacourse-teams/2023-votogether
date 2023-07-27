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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 40px;

  position: relative;
  top: 80px;
  left: 30px;

  width: 96%;

  @media (min-width: 576px) {
    flex-direction: row;
    justify-content: start;

    left: 40px;
  }

  @media (min-width: 1280px) {
    gap: 150px;

    left: 70px;
  }
`;

export const Title = styled.input`
  color: gray;

  font: var(--text-title);
`;

export const Content = styled.textarea`
  height: 300px;
  color: gray;

  resize: none;

  font: var(--text-caption);
  font-family: 'Raleway', sans-serif;

  @media (min-width: 576px) {
    height: 670px;
  }
`;

export const ContentImagePart = styled.div`
  display: grid;
  grid-template-columns: 40px auto;
`;

export const ContentImageContainer = styled.div`
  width: 60%;

  position: relative;
`;

export const ContentImage = styled.img`
  width: 100%;
  border-radius: 4px;

  aspect-ratio: 1/1;
  object-fit: cover;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;

  width: 90%;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 20px;

  width: 90%;

  @media (min-width: 576px) {
    margin-top: 40px;
  }
`;

export const OptionListWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  height: 540px;

  overflow-x: hidden;
  overflow-y: scroll;

  @media (min-width: 576px) {
    max-width: 500px;
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
  gap: 10px;

  width: 90%;
  height: 90px;
  margin-bottom: 30px;
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
