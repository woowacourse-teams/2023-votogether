import { styled } from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  padding: 10px;

  font-size: 1.5rem;
  font-weight: bold;
`;

export const Body = styled.div`
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

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const Title = styled.input`
  color: gray;

  font-size: 2rem;
`;

export const Content = styled.textarea`
  height: 200px;
  color: gray;

  font-size: 1.4rem;
  font-family: 'Raleway', sans-serif;
`;

export const OptionListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 20px;

  width: 100%;
  height: 300px;
`;

export const Deadline = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
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

  position: absolute;
  top: 80px;
  left: 50px;
`;

export const HeaderButton = styled.button`
  width: 30px;

  color: white;

  cursor: pointer;
`;

export const Description = styled.div`
  color: gray;

  font-size: 1.2rem;
`;

export const CloseButton = styled.button`
  width: 25px;
  height: 20px;

  background: white;

  font-size: 1.6rem;

  cursor: pointer;
`;
