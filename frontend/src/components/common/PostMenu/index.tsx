import { MouseEvent } from 'react';

import { PostAction, PostMenuItem } from '@type/menu';

import * as S from './style';

interface PostMenuProps {
  menuList: PostMenuItem[];
  handleMenuClick: (menu: PostAction) => void;
}

export default function PostMenu({ menuList, handleMenuClick }: PostMenuProps) {
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
