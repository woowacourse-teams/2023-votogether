import { styled } from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Active = styled.div<{ $isActive: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: ${props => props.$isActive && 'var(--primary-color)'};

  position: absolute;
  bottom: 32px;
  left: 32px;
`;
