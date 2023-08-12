import { styled } from 'styled-components';

import { Size } from '@type/style';

interface ButtonProps {
  $size: Size;
}

const SIZE = {
  sm: { width: '80px', height: '40px', fontSize: '14px' },
  md: { width: '100px', height: '50px', fontSize: '20px' },
  lg: { width: '120px', height: '60px', fontSize: '24px' },
};

export const Button = styled.button<ButtonProps>`
  display: block;

  width: ${props => SIZE[props.$size].width};
  height: ${props => SIZE[props.$size].height};
  border-radius: 0 0 5px 5px;

  background-color: var(--primary-color);
  color: var(--white);

  font-size: ${props => SIZE[props.$size].fontSize};

  cursor: pointer;
`;
