import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;

  font: var(--text-caption);
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 7px 7px 0 0;
  padding: 16px;

  background-color: #ffffff;

  &:hover {
    background-color: #f2f2f2;
  }
  cursor: pointer;
`;

export const Content = styled.div<{ $isOpen: boolean }>`
  display: ${props => (props.$isOpen ? 'block' : 'none')};
  justify-content: space-between;

  border: 1px solid #f2f2f2;
  border-radius: 0 0 7px 7px;
  padding: 16px;

  opacity: ${props => (props.$isOpen ? 1 : 0)};
  animation: ${props => (props.$isOpen ? fadeIn : fadeOut)} 0.2s ease-in-out;
`;

export const Image = styled.img<{ $isOpen: boolean }>`
  width: 20px;
  height: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: auto;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    height: auto;
  }
  to {
    opacity: 0;
    height: 0;
  }
`;
