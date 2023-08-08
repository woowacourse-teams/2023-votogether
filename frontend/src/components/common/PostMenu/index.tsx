import { MouseEvent } from 'react';

import { MenuItem } from '@type/menu';

import * as S from './style';

interface PostMenuProps {
  menuList: MenuItem[];
  handleMenuClick: (menu: string) => void;
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
