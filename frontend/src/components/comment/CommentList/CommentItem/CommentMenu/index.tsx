import { type CommentAction, type CommentMenuItem } from '@type/comment';

import * as S from './style';

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
