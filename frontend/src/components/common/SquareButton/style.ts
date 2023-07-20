import { styled } from 'styled-components';

interface ButtonProps {
  theme: 'blank' | 'fill';
}

export const Button = styled.button<ButtonProps>`
  display: block;

  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: 5px;

  background-color: ${props =>
    props.theme === 'blank' ? 'rgba(0,0,0,0)' : 'var(--primary-color)'};
  color: ${props => (props.theme === 'blank' ? 'var(--primary-color)' : 'var(--white)')};

  font: var(--text-body);

  cursor: pointer;
`;
