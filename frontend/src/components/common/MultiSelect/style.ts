import { styled } from 'styled-components';

import { theme } from '@styles/theme';

export const Container = styled.div`
  position: relative;

  font: var(--text-caption);

  & > * {
    background-color: var(--white);
  }

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  align-items: center;

  height: auto;
  border: 1px solid var(--slate);
  border-radius: 6px;
  padding: 7px;

  position: relative;

  cursor: pointer;
`;

export const SelectedOptionListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
`;

export const SelectIcon = styled.button`
  width: 20px;
`;

export const DropDown = styled.div<{
  $isOpened: boolean;
}>`
  width: 100%;
  border: 1px solid #e4e5e7;
  border-radius: 6px;
  margin-top: 10px;

  position: absolute;

  opacity: ${({ $isOpened }) => ($isOpened ? 1 : 0)};
  visibility: ${({ $isOpened }) => ($isOpened ? 'visible' : 'hidden')};

  transition: all 0.2s linear 0.1s;

  & > button {
    display: block;

    width: 100%;
    list-style: none;
    padding: 10px 0px 10px 15px;
    border-bottom: 1px solid #e4e5e7;

    text-align: left;

    &:hover {
      background-color: #ffefd5;
    }
    &:last-child {
      border-bottom: none;
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
