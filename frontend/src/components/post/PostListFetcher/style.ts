import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const PostListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 30px 20px;
`;

export const HiddenButton = styled.button`
  position: absolute;
`;

export const HiddenLink = styled(Link)`
  position: absolute;
`;
