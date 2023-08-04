import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const TitleContainer = styled.button`
  display: flex;
  align-items: center;

  font: inherit;

  cursor: pointer;
`;

export const TriangleImage = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px 12px;
`;

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
`;

export const Circle = styled.button<{ $isFavorite: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;

  background-color: ${({ $isFavorite }) => ($isFavorite ? 'var(--primary-color)' : '#CCCCCC')};

  cursor: pointer;
`;

export const Caption = styled.span`
  font: var(--text-caption);

  color: var(--dark-gray);
`;

export const CategoryNameLink = styled(Link)`
  text-decoration: none;

  color: inherit;
`;
