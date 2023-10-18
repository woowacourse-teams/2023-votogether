import styled from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  padding-left: 20px;

  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const List = styled.ul`
  /* padding-left: 30px; */
  margin-top: 10px;
  padding: 10px 10px 10px 30px;

  background-color: var(--bright-gray);

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
  padding: 30px;
  margin-top: 10px;

  background-color: var(--bright-gray);

  //포함된 부분에서 이벤트 발생을 막는 속성
  pointer-events: none;
`;
