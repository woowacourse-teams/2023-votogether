import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  font-size: 1.2rem;

  @media (min-width: 576px) {
    font-size: 1.4rem;
  }
`;

export const CategoryWrapper = styled.fieldset`
  display: flex;
  gap: 10px;
`;

export const RadioLabel = styled.label`
  display: flex;
  gap: 5px;
`;
