import { styled } from 'styled-components';

import { Size } from '@type/style';

interface SearchBarProps {
  size: Size | 'free';
}

const formSize = {
  sm: '170px',
  md: '250px',
  lg: '400px',
};

export const Form = styled.form<SearchBarProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  width: ${props => (props.size === 'free' ? '100%' : formSize[props.size])};
  height: 36px;
  padding: 5px 10px;
  border-radius: 5px;

  background-color: #cccccc;
  color: red;

  font-size: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  outline: 0;

  background-color: rgba(0, 0, 0, 0);

  font: var(--text-caption);
  letter-spacing: 1px;
`;

export const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);

  cursor: pointer;
`;

export const ScreenReaderDirection = styled.p`
  position: absolute;
  left: -9999px;
`;
