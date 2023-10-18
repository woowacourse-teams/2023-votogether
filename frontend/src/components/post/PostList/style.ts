import { Link } from 'react-router-dom';

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
  width: 100%;
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
`;

export const SelectWrapper = styled.div`
  width: 110px;

  position: absolute;

  &:first-child {
    left: 20px;
  }
  &:last-child {
    right: 20px;
  }
`;

export const HiddenButton = styled.button`
  position: absolute;
`;

export const HiddenLink = styled(Link)`
  position: absolute;
`;
