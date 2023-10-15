import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 10px;

  font: var(--text-caption);
`;

export const List = styled.ul`
  background-color: var(--bright-gray);
  padding: 10px;
  padding-left: 30px;
  margin-top: 10px;

  font-size: 1.4rem;
`;

export const ListItem = styled.li`
  margin: 5px 0;

  list-style-type: disc;
`;

export const Content = styled.div`
  background-color: var(--bright-gray);
  padding: 30px;
  margin-top: 10px;

  //포함된 부분에서 이벤트 발생을 막는 속성
  pointer-events: none;
`;
