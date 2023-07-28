import React from 'react';

import { CommentAction } from '../types';

import * as S from './style';
import { CommentMenuItem } from './types';

interface CommentMenuProps {
  menuList: CommentMenuItem[];
  handleMenuClick: (menu: CommentAction) => void;
}

export default function CommentMenu({ menuList, handleMenuClick }: CommentMenuProps) {
  return (
    <S.Container>
      {menuList.map(({ content, color, action }) => (
        <S.Menu $color={color} onClick={() => handleMenuClick(action)}>
          {content}
        </S.Menu>
      ))}
    </S.Container>
  );
}
