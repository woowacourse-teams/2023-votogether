import { styled } from 'styled-components';

import { Size } from './type';

interface ButtonProps {
  size: Size;
}

const size = {
  sm: { button: '25px', font: '13px' },
  md: { button: '40px', font: '30px' },
  lg: { button: '60px', font: '50px' },
};

export const Button = styled.button<ButtonProps>`
  display: block;

  width: ${props => size[props.size].button};
  height: ${props => size[props.size].button};
  border-radius: 50%;

  background-color: #ff7877;
  color: #ffffff;

  font-size: ${props => size[props.size].font};

  cursor: pointer;
`;
