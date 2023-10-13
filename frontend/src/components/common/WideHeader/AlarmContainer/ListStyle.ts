import styled from 'styled-components';

export const ListContainer = styled.ul``;

export const ListItem = styled.li`
  display: flex;
  border: 1px solid var(--gray);
  align-items: center;

  min-height: 60px;
  margin: 2px 0;

  font-size: 1.4rem;
`;

export const ButtonWrapper = styled.li`
  margin-top: 10px;
`;

export const LinkButton = styled.button`
  height: 100%;
  width: 100%;

  padding: 10px;
  text-align: left;

  cursor: pointer;

  &:hover {
    background-color: var(--bright-gray);
  }

  & > *:first-child {
    font-weight: 500;
  }

  & > *:last-child {
    margin-top: 5px;
    text-align: right;
    font: var(--text-small);
  }
`;
