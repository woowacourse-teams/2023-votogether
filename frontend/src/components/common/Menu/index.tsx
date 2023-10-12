import { MouseEvent } from 'react';

import * as S from './style';
import { MenuItem } from './types';

interface MenuProps<T> {
  menuList: MenuItem<T>[];
  handleMenuClick: (menu: T) => void;
}

export default function Menu<T>({ menuList, handleMenuClick }: MenuProps<T>) {
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
