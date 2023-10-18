import styled from 'styled-components';

import { theme } from '@styles/theme';

// 컨테이너를 가로중앙에 위치시키기 위해 left = width * 1/2로 설정
export const Container = styled.div`
  width: 80%;

  position: fixed;
  bottom: 20vh;
  left: 10%;

  z-index: ${theme.zIndex.toast};

  > * {
    margin-top: 3px;
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 60%;

    left: 20%;
  }

  @media (min-width: ${theme.breakpoint.md}) {
    width: 50%;

    left: 25%;
  }
`;
