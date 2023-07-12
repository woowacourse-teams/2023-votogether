import { styled } from 'styled-components';

interface ButtonProps {
  size: 'S' | 'M' | 'L';
}

const size = {
  S: '25px',
  M: '40px',
  L: '60px',
};

export const Button = styled.button<ButtonProps>`
  display: block;

  width: ${props => (props.size === 'L' ? size.L : props.size === 'M' ? size.M : size.S)};
  height: ${props => (props.size === 'L' ? size.L : props.size === 'M' ? size.M : size.S)};
  border-radius: 50%;

  background-color: #ff7877;
  color: #ffffff;

  font-size: ${props => (props.size === 'L' ? '50px' : props.size === 'M' ? '30px' : '13px')};

  cursor: pointer;
`;
