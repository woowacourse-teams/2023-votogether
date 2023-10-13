import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;

  background-color: var(--header);

  padding: 0 80px;
`;

export const LogoWrapper = styled.div`
  height: 50%;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 15px;
`;

export const ToolTipBackdrop = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  z-index: ${theme.zIndex.modal};

  > * {
    position: absolute;
    top: 55px;
    // 헤더 오른쪽 공백값(80px)
    // + 랭킹 아이콘 크기(35px)
    // + 아이콘 사이 간격(15px)
    // - 툴팁 화살표 오른쪽 공백(20px)
    right: calc(80px + 35px + 15px - 20px);
  }
`;
