import { styled } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 15px;

  width: 200px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border: 1px solid #f2f2f2;
`;

export const PickedTimeText = styled.p`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;

  font-size: 1.5rem;
  font-weight: bold;
`;
