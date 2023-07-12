import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;

  background-color: #1f1f1f;

  position: absolute;
  top: 0;

  padding: 0 80px;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0);

  height: 50%;

  & :first-child {
    border-radius: 5px;
  }

  & :last-child {
    height: 60%;
  }

  cursor: pointer;
`;

export const Img = styled.img`
  height: 100%;
`;
