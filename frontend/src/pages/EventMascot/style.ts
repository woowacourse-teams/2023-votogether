import { styled } from 'styled-components';

import { theme } from '@styles/theme';

//이벤트를 위한 코드
export const Container = styled.div<{ $isVisible: boolean }>`
  display: ${props => (props.$isVisible ? '' : 'none')};

  position: absolute;
  top: 40vh;
  left: 40vw;

  @media (min-width: ${theme.breakpoint.sm}) {
    top: 45vh;
    left: 45vw;
  }
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
`;
