import { styled } from 'styled-components';

interface ButtonProps {
  theme: 'blank' | 'fill';
}

export const Button = styled.button<ButtonProps>`
  display: block;

  width: 100%;
  height: 100%;
  outline: 2px solid #ff7877;
  border-radius: 5px;

  background-color: ${props => (props.theme === 'blank' ? 'rgba(0,0,0,0)' : '#ff7877')};
  color: ${props => (props.theme === 'blank' ? '#ff7877' : '#ffffff')};

  font-size: 16px;
`;
