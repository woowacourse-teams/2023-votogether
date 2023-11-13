import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const WriteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 60px;
`;

export const Title = styled.span`
  font: var(--text-page-title);
`;

export const ButtonWrapper = styled(Link)`
  width: 150px;
  height: 50px;
`;
