import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 100px;
`;

export const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 30px 0;
`;

export const Title = styled.span`
  font: var(--text-page-title);
`;

export const ButtonWrapper = styled(Link)`
  width: 200px;
  height: 60px;
  margin-top: 30px;
`;
