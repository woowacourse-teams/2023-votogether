import { styled } from 'styled-components';

import { theme } from '@styles/theme';

import { SELECT_DEFAULT, SELECT_DISABLED, SELECT_SELECTED } from './constants';

export const Container = styled.div`
  font: var(--text-caption);

  @media (min-width: ${theme.breakpoint.sm}) {
    font: var(--text-body);
  }
`;

const SELECTED_CSS_OPTION = {
  selected: {
    border: '2px solid #60a5fa',
    color: 'var(--slate)',
    cursor: 'pointer',
  },
  disabled: {
    border: '1px solid var(--slate)',
    color: 'var(--slate)',
    cursor: 'not-allowed',
  },
  default: {
    border: '1px solid var(--slate)',
    color: '',
    cursor: 'pointer',
  },
};

type Status = typeof SELECT_DEFAULT | typeof SELECT_DISABLED | typeof SELECT_SELECTED;

export const SelectedContainer = styled.button<{ $status: Status }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 8px;
  border: ${({ $status }) => SELECTED_CSS_OPTION[$status].border};
  border-radius: 4px;

  font: inherit;

  color: ${({ $status }) => SELECTED_CSS_OPTION[$status].color};

  cursor: ${({ $status }) => SELECTED_CSS_OPTION[$status].cursor};
`;

export const OptionListParent = styled.div`
  position: relative;

  z-index: ${theme.zIndex.select};
`;

export const OptionListContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 1px solid var(--slate);
  border-radius: 4px;

  position: absolute;
  top: 4px;

  background-color: var(--white);
`;

export const OptionContainer = styled.div`
  padding: 8px;

  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Image = styled.img<{ $isSelected: boolean }>`
  width: 20px;
  height: 20px;
  border-left: 1px solid var(--slate);
  padding-left: 8px;
`;

export const ScreenReaderDirection = styled.p`
  position: absolute;
  left: -9999px;
`;
