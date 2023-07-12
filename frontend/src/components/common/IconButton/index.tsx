import { ButtonHTMLAttributes } from 'react';

import backIcon from '@assets/back.svg';
import categoryIcon from '@assets/category.svg';
import searchIcon from '@assets/search.svg';

import * as S from './style';

type IconCategory = 'category' | 'back' | 'search';

const iconCategory: { [key in IconCategory]: { name: string; url: string } } = {
  category: {
    name: '카테고리',
    url: categoryIcon,
  },
  back: {
    name: '뒤로가기',
    url: backIcon,
  },
  search: {
    name: '검색',
    url: searchIcon,
  },
};

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  category: IconCategory;
}

/* 뒤로가기, 카테고리 열기 등에 사용될 아이콘 버튼
 */
export default function IconButton({ category, ...rest }: IconButtonProps) {
  const src = iconCategory[category].url;
  const ariaLabelText = iconCategory[category].name;

  return (
    <S.Button aria-label={ariaLabelText} {...rest}>
      <img src={src} alt={`${ariaLabelText}-icon`} />
    </S.Button>
  );
}
