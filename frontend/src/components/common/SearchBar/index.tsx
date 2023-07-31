import { FormHTMLAttributes } from 'react';

import { Size } from '@type/style';

import { PATH } from '@constants/path';
import { SEARCH_KEYWORD } from '@constants/post';

import searchIcon from '@assets/search_black.svg';

import * as S from './style';

interface SearchBarProps extends FormHTMLAttributes<HTMLFormElement> {
  size: Size | 'free';
}

export default function SearchBar({ size, ...rest }: SearchBarProps) {
  return (
    <S.Form size={size} {...rest} action={PATH.SEARCH}>
      <S.Input type="search" name={SEARCH_KEYWORD} />
      <S.Button type="submit">
        <img src={searchIcon} alt="검색버튼" />
      </S.Button>
    </S.Form>
  );
}
