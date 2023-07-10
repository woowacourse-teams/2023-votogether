import { styled } from 'styled-components';

interface ButtonProps {
  size: 'S' | 'M' | 'L';
}

export const Button = styled.button<ButtonProps>`
  display: block;

  width: ${props => (props.size === 'L' ? '60px' : props.size === 'M' ? '40px' : '25px')};
  height: ${props => (props.size === 'L' ? '56px' : props.size === 'M' ? '37px' : '22px')};
  border-radius: 50%;

  background-color: #ff7877;
  color: #ffffff;

  font-size: ${props => (props.size === 'L' ? '50px' : props.size === 'M' ? '30px' : '13px')};
`;
