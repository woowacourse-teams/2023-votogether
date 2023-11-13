import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 0 50px;
`;

export const PostDetailLink = styled(Link)`
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  width: 50px;
  height: 50px;
`;

export const EditButtonWrapper = styled(Link)`
  width: 100%;
  height: 40px;
`;

export const DeleteButtonWrapper = styled.div`
  width: 100%;
  height: 40px;
`;
