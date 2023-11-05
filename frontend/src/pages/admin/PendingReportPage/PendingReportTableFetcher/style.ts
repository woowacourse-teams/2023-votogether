import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { theme } from '@styles/theme';

export const PostDetailLink = styled(Link)`
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const ReportActionButton = styled.button<{ $isEdit: boolean }>`
  height: 35px;
  border: 1px solid red;
  border-radius: 4px;
  border-color: ${props => (props.$isEdit ? 'blue' : 'red')};

  color: ${props => (props.$isEdit ? 'blue' : 'red')};
  padding: 7px 14px;

  @media (max-width: ${theme.breakpoint.sm}) {
    padding: 10px;
    font-size: 10px;
  }
`;

export const ReportDeleteButton = styled.button`
  height: 35px;

  border: 1px solid gray;
  border-radius: 4px;
  color: gray;
  padding: 7px 14px;

  @media (max-width: ${theme.breakpoint.sm}) {
    padding: 10px;
    font-size: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  width: 100%;
  margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
  width: 60px;
  height: 60px;
`;
