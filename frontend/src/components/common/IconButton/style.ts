import { styled } from 'styled-components';

export const Button = styled.button<{ $isRoundBackground: boolean }>`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  background-color: ${props => (props.$isRoundBackground ? 'var(--gray)' : '')};

  cursor: pointer;

  > * {
    width: ${props => props.$isRoundBackground && '25px'};
    height: ${props => props.$isRoundBackground && '25px'};
  }
`;
