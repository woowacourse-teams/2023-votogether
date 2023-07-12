import { styled } from 'styled-components';

import { Size } from './type';

interface ButtonProps {
  size: Size;
}

const buttonSize = {
  sm: '25px',
  md: '40px',
  lg: '60px',
};

export const Button = styled.button<ButtonProps>`
  display: block;

  width: ${props =>
    props.size === 'lg' ? buttonSize.lg : props.size === 'md' ? buttonSize.md : buttonSize.sm};
  height: ${props =>
    props.size === 'lg' ? buttonSize.lg : props.size === 'md' ? buttonSize.md : buttonSize.sm};
  border-radius: 50%;

  background-color: #ff7877;
  color: #ffffff;

  font-size: ${props => (props.size === 'lg' ? '50px' : props.size === 'md' ? '30px' : '13px')};

  cursor: pointer;
`;
