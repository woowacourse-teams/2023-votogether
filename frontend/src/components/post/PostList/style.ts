import { styled } from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 40px 20px;

  > li {
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
