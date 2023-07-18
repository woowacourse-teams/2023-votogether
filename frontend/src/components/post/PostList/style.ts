import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

export const PostListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 30px 20px;

  > li {
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
