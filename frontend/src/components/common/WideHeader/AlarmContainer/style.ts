import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 40px auto;
  gap: 10px;

  height: 100%;
  width: 450px;
  padding: 10px;
`;

export const Content = styled.div`
  min-height: 300px;
`;

export const LoadingSpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  // 컨테이너 높이 - 토글 셀렉터 높이 - gap 높이 빼기
  height: calc(300px - 40px - 10px);
`;
