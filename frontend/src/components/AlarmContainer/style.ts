import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 40px auto;
  gap: 10px;

  padding: 10px;
`;

export const Content = styled.div`
  padding: 10px;
  border: 1px solid var(--primary-color);
  border-radius: 4px;

  overflow: scroll;
`;

export const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 200px;
`;
