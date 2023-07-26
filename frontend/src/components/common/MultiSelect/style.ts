import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 80%;
  height: auto;
  border: 1px solid var(--slate);
  border-radius: 6px;
  padding: 7px;

  position: relative;

  font: var(--text-caption);

  cursor: pointer;

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }

  @media (min-width: ${theme.breakpoint.md}) {
    width: 50%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const SelectIcon = styled.span`
  display: 'inline-block';
  width: 20px;
`;

export const DropDown = styled.ul<{
  opened: boolean;
  wrapperClientHeight: number;
}>`
  width: 100%;
  border-radius: 6px;
  margin-top: 10px;

  position: absolute;
  top: ${({ wrapperClientHeight }) => wrapperClientHeight - 10}px;
  left: 0px;

  opacity: ${({ opened }) => (opened ? 1 : 0)};
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};

  transition: all 0.2s linear 0.1s;

  & > li {
    list-style: none;
    padding: 10px 0px 10px 15px;
    border-bottom: 1px solid #e4e5e7;
    border-left: 1px solid #e4e5e7;
    border-right: 1px solid #e4e5e7;

    &:hover {
      background-color: #ffefd5;
    }
  }
`;

export const SelectedOption = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;
  padding: 10px;
  margin: 2px 4px 2px 2px;
  & > span {
    margin-right: 8px;
  }

  background: #e8f7f6;
`;

export const Image = styled.img<{ $isSelected: boolean }>`
  width: 20px;
  height: 20px;
  border-left: 1px solid var(--slate);
  padding-left: 8px;
`;
