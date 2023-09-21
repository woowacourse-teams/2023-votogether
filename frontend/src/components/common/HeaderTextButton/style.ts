import { styled } from 'styled-components';

export const Button = styled.button<{ $isLoading: boolean }>`
  background-color: rgba(0, 0, 0, 0);
  color: ${props => (props.$isLoading ? 'gray' : 'var(--white)')};

  font: var(--text-caption);
  font-weight: ${props => (props.$isLoading ? 600 : 500)};

  cursor: pointer;
`;
