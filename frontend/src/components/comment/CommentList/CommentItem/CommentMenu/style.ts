import { styled } from 'styled-components';

import { CommentMenuItem } from '@type/comment';

const COLOR_PALETTE: Record<CommentMenuItem['color'], string> = {
  red: 'var(--primary-color)',
  black: 'var(--dark-gray)',
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: max-content;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;

  font: var(--text-caption);
`;

export const Menu = styled.div<{ $color: CommentMenuItem['color'] }>`
  padding: 10px 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);

  color: ${({ $color }) => COLOR_PALETTE[$color]};

  cursor: pointer;
  background-color: white;

  &:hover {
    background-color: var(--gray);
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-bottom: none;
  }
`;
