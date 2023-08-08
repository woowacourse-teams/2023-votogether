import { MouseEvent } from 'react';

import { type CommentAction, type CommentMenuItem } from '@components/comment/CommentList/types';

import * as S from './style';

interface CommentMenuProps {
  menuList: CommentMenuItem[];
  handleMenuClick: (menu: CommentAction) => void;
}

export default function CommentMenu({ menuList, handleMenuClick }: CommentMenuProps) {
  return (
    <S.Container>
      {menuList.map(({ content, color, action }) => (
        <S.Menu
          key={content}
          type="button"
          $color={color}
          onClick={(event: MouseEvent) => {
            event.stopPropagation();
            handleMenuClick(action);
          }}
        >
          {content}
        </S.Menu>
      ))}
    </S.Container>
  );
}
