import { styled } from 'styled-components';

export const Container = styled.ul`
  width: 100%;

  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);

  > li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    &:last-child {
      border-bottom: none;
    }
  }
`;
