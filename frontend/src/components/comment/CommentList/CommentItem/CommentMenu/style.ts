import { styled } from 'styled-components';

import { type CommentMenuItem } from '../../types';

const COLOR_PALETTE: Record<CommentMenuItem['color'], string> = {
  red: 'var(--primary-color)',
  black: '#727171',
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;

  background-color: var(--white);

  font: var(--text-caption);
`;

export const Menu = styled.button<{ $color: CommentMenuItem['color'] }>`
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);

  color: ${({ $color }) => COLOR_PALETTE[$color]};
  background-color: white;

  cursor: pointer;

  &:hover {
    background-color: var(--gray);
  }

  &:first-child {
    border-radius: 6px 6px 0 0;
  }

  &:last-child {
    border-radius: 0 0 6px 6px;
    border-bottom: none;
  }
`;
