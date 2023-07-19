import { styled } from 'styled-components';

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

  font-size: 2rem;
`;

export const Content = styled.textarea`
  height: 300px;
  color: gray;

  font-size: 1.4rem;
  font-family: 'Raleway', sans-serif;

  @media (min-width: 576px) {
    height: 670px;
  }
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justfiy-content: start;
  gap: 30px;

  width: 90%;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justfiy-content: start;
  gap: 20px;

  width: 90%;

  @media (min-width: 576px) {
    margin-top: 40px;
  }
`;

export const OptionListWrapper = styled.div`
  width: 100%;
  max-width: 320px;

  overflow-x: hidden;
  overflow-y: none;

  @media (min-width: 576px) {
    max-width: 500px;
    height: 540px;

    overflow-y: scroll;
  }
`;

export const Deadline = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

export const Description = styled.div`
  color: gray;

  font-size: 1.2rem;
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

  font-size: 1.5rem;
  font-weight: bold;
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 20px;

  background: white;

  font-size: 1.6rem;

  cursor: pointer;
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;

  padding: 10px 0;

  font-size: 1.4rem;
`;

export const ResetButtonWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;

  width: 50%;
  height: 40px;
`;
