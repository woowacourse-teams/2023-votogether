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

  & :first-child {
    height: 70%;

    & :last-child {
      height: 40%;
    }
  }
`;
