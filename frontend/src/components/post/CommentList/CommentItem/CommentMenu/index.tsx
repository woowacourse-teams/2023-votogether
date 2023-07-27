import React from 'react';

import * as S from './style';
import { CommentMenuItem } from './types';

interface CommentMenuProps {
  menuList: CommentMenuItem[];
}

export default function CommentMenu({ menuList }: CommentMenuProps) {
  return (
    <S.Container>
      {menuList.map(({ content, color }) => (
        <S.Menu $color={color}>{content}</S.Menu>
      ))}
    </S.Container>
  );
}
