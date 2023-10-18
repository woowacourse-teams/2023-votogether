import { ButtonHTMLAttributes } from 'react';

import backIcon from '@assets/back.svg';
import bellIcon from '@assets/bell.png';
import categoryIcon from '@assets/category.svg';
import ranking from '@assets/ranking.png';
import retryIcon from '@assets/retry.svg';
import searchIcon from '@assets/search_white.svg';

import * as S from './style';

type IconCategory = 'category' | 'back' | 'search' | 'retry' | 'alarm' | 'ranking';

interface IconInfo {
  name: string;
  url: string;
  isRoundBackground: boolean;
}

const ICON_CATEGORY: Record<IconCategory, IconInfo> = {
  category: {
    name: '카테고리',
    url: categoryIcon,
    isRoundBackground: false,
  },
  back: {
    name: '뒤로가기',
    url: backIcon,
    isRoundBackground: false,
  },
  search: {
    name: '검색',
    url: searchIcon,
    isRoundBackground: false,
  },
  retry: {
    name: '다시시도',
    url: retryIcon,
    isRoundBackground: false,
  },
  alarm: {
    name: '알림',
    url: bellIcon,
    isRoundBackground: true,
  },
  ranking: {
    name: '랭킹 페이지 이동',
    url: ranking,
    isRoundBackground: false,
  },
};

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  category: IconCategory;
}

/* 뒤로가기, 카테고리 열기 등에 사용될 아이콘 버튼
 */
export default function IconButton({ category, ...rest }: IconButtonProps) {
  const src = ICON_CATEGORY[category].url;
  const ariaLabelText = ICON_CATEGORY[category].name;

  return (
    <S.Button
      aria-label={ariaLabelText}
      $isRoundBackground={ICON_CATEGORY[category].isRoundBackground}
      {...rest}
    >
      <img src={src} alt={`${ariaLabelText} 버튼`} />
    </S.Button>
  );
}
