import { styled } from 'styled-components';

export const Button = styled.button<{ $isRoundBackground: boolean }>`
  width: 35px;
  height: 35px;
  border-radius: 50%;

  background-color: ${props => (props.$isRoundBackground ? 'var(--bright-gray)' : '')};

  cursor: pointer;

  > * {
    width: ${props => props.$isRoundBackground && '20px'};
    height: ${props => props.$isRoundBackground && '20px'};
  }
`;
