import styled from 'styled-components';

export const Description = styled.p`
  margin: 30px 0;

  font: var(--text-body);
  text-align: center;
  font-weight: 500;
`;

export const ListContainer = styled.ul`
  font: var(--text-default);
`;

export const ListItem = styled.li<{ $isRead: boolean }>`
  display: flex;

  border: 1px solid var(--gray);
  align-items: center;
  min-height: 60px;
  margin: 5px 0;

  background-color: ${props => props.$isRead && 'var(--bright-gray)'};
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
    background-color: var(--gray);
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
