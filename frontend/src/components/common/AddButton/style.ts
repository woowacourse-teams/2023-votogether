import { styled } from 'styled-components';

import { Size } from '@type/style';

interface ButtonProps {
  size: Size;
}

const SIZE = {
  sm: { button: '25px', font: '13px' },
  md: { button: '40px', font: '30px' },
  lg: { button: '60px', font: '50px' },
};

export const Button = styled.button<ButtonProps>`
  display: block;

  width: ${props => SIZE[props.size].button};
  height: ${props => SIZE[props.size].button};
  border-radius: 50%;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props => SIZE[props.size].font};

  cursor: pointer;
`;
