import { styled } from 'styled-components';

export const ToastWrapper = styled.div<{ $placement: 'left' | 'right' }>`
  position: absolute;
  width: 100vw;
  left: ${({ $placement }) => ($placement === 'left' ? '0' : 'auto')};
  right: ${({ $placement }) => ($placement === 'right' ? '0' : 'auto')};
`;
