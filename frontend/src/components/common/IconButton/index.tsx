import backIcon from '@assets/back.svg';
import categoryIcon from '@assets/category.svg';
import searchIcon from '@assets/search.svg';

import * as S from './style';

interface IconButtonProps {
  category: 'category' | 'back' | 'search';
}

/* 뒤로가기, 카테고리 열기 등에 사용될 아이콘 버튼
 */
export default function IconButton({ category }: IconButtonProps) {
  const src = category === 'category' ? categoryIcon : category === 'back' ? backIcon : searchIcon;
  return (
    <S.Button>
      <img src={src} alt={`${category}-button`} />
    </S.Button>
  );
}
