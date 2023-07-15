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
  margin-right: 8px;

  font-size: 4rem;
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

export const Circle = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;

  background-color: #ccc;

  cursor: pointer;
`;

export const CategoryName = styled(Link)``;
