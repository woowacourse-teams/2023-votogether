import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  background-color: #f6f6f6;
  border-radius: 10px;

  font-size: 20px;
`;

export const StatisticsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    padding: 30px;
  }
`;
