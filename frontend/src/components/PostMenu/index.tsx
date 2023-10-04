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
          tabIndex={0}
          aria-label={content}
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
