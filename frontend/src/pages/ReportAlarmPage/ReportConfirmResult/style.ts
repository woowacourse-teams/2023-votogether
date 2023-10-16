import styled from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 10px;

  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const List = styled.ul`
  background-color: var(--bright-gray);
  padding: 10px;
  padding-left: 30px;
  margin-top: 10px;

  font: var(--text-default);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-caption);
  }
`;

export const ListItem = styled.li`
  margin: 10px 0;

  list-style-type: disc;
`;

export const Content = styled.div`
  background-color: var(--bright-gray);
  padding: 30px;
  margin-top: 10px;

  //포함된 부분에서 이벤트 발생을 막는 속성
  pointer-events: none;
`;
