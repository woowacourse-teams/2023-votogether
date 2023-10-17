import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 15px;

  padding: 15px;

  @media (max-width: ${theme.breakpoint.sm}) {
    margin-top: 40px;
  }
`;

export const PageTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  width: 100%;
  margin-top: 20px;
`;

export const PaginationButton = styled(Link)<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 17px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 7px 20px 9px 20px;

  background-color: ${props => (props.$isSelected ? '#DCF0FA' : 'white')};

  font: var(--text-caption);
`;

export const MovePageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid gray;
  border-radius: 5px;
  padding: 7px 12px 9px 12px;

  font: var(--text-caption);
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
