import { Link } from 'react-router-dom';

import { styled } from 'styled-components';

export const Container = styled.div`
  padding: 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
`;

export const EditButtonWrapper = styled(Link)`
  width: 100%;
  height: 60px;
`;

export const DeleteButtonWrapper = styled.div`
  width: 100%;
  height: 60px;
`;
