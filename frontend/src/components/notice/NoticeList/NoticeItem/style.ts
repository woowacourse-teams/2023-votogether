import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.li``;

export const DetailLink = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 100%;

  padding: 10px 15px;

  @media (min-width: ${theme.breakpoint.sm}) {
    flex-direction: row;
    justify-content: space-between;

    padding: 16px 20px;
  }
`;

export const Title = styled.span`
  width: 100%;
  display: -webkit-box;

  text-overflow: ellipsis;
  word-break: break-word;

  overflow: hidden;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  font: var(--text-body);

  transition: color 0.2s ease-in-out;

  &:hover {
    color: rgba(51, 122, 183, 1);
  }
`;

export const CreatedAt = styled.span`
  font: var(--text-body);
  font-size: 1.4rem;

  text-align: right;

  color: var(--text-dark-gray);

  @media (min-width: ${theme.breakpoint.sm}) {
    width: 90px;
  }
`;
