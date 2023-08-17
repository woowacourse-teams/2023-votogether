import { HTMLAttributes } from 'react';

import { Size } from '@type/style';

import { PATH } from '@constants/path';
import { SEARCH_KEYWORD } from '@constants/post';

import searchIcon from '@assets/search_black.svg';

import * as S from './style';

interface SearchBarProps extends HTMLAttributes<HTMLInputElement> {
  size: Size | 'free';
  isOpen?: boolean;
}

export default function SearchBar({ size, isOpen, ...rest }: SearchBarProps) {
  return (
    <S.Form size={size} action={PATH.SEARCH}>
      <S.Input type="search" name={SEARCH_KEYWORD} {...rest} />
      <S.Button type="submit">
        <img src={searchIcon} alt="검색버튼" />
      </S.Button>
      {isOpen && (
        <S.ScreenReaderDirection aria-live="polite">
          검색창을 닫으려면 검색창 외부를 클릭해주세요.
        </S.ScreenReaderDirection>
      )}
    </S.Form>
  );
}
