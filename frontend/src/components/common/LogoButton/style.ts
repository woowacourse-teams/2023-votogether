import { styled } from 'styled-components';

type Content = 'icon' | 'text' | 'full';

export const Button = styled.button<{ content: Content }>`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0);

  height: 100%;

  cursor: pointer;

  & :first-child {
    height: 100%;
    border-radius: 5px;
  }

  & :last-child {
    height: ${props => props.content !== 'icon' && '60%'};
  }
`;
