import { styled } from 'styled-components';

type Inclusion = 'icon' | 'text' | 'full';

export const Button = styled.button<{ inclusion: Inclusion }>`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: rgba(0, 0, 0, 0);

  height: 100%;

  & :first-child {
    height: 100%;
    border-radius: 5px;
  }

  & :last-child {
    height: ${props => props.inclusion !== 'icon' && '60%'};
  }

  cursor: pointer;
`;
