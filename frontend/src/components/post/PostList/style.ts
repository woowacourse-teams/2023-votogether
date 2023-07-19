import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  @media (min-width: ${theme.breakpoint.sm}) {
    padding: 40px 20px;
  }
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

export const SelectWrapper = styled.div`
  width: 100px;

  position: absolute;

  &:first-child {
    left: 20px;
  }
  &:last-child {
    right: 20px;
  }
`;
