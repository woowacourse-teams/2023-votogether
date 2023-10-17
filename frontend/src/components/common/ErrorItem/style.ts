import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  position: relative;
`;

export const Title = styled.h1`
  width: 90%;
  margin-top: 20px;

  color: rgba(0, 0, 0, 0.7);

  font-size: 20px;
  font-weight: bold;

  text-align: center;
  word-break: keep-all;
`;

export const Description = styled.p`
  width: 90%;

  color: gray;

  font: var(--text-body);
  text-align: center;
  word-break: keep-all;
`;

export const ButtonContainer = styled.div`
  display: flex;

  gap: 20px;

  margin-top: 50px;
`;

export const ButtonWrapper = styled.div`
  width: 140px;
  height: 50px;
`;
