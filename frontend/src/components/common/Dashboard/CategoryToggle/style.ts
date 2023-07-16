import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const Container = styled.div`
  font: var(--text-body);
`;

export const TitleContainer = styled.button`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

export const Title = styled.h4`
  font: var(--text-body);
`;

export const TriangleImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 8px;
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

export const CategoryName = styled(Link)`
  text-decoration: none;

  color: initial;
`;
