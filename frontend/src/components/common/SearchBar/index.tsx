import { HTMLAttributes } from 'react';

import { Size } from '@type/style';

import { useSearch } from '@hooks';

import { useCurrentKeyword } from '@hooks/useCurrentKeyword';

import { SEARCH_KEYWORD } from '@constants/api';
import { PATH } from '@constants/path';
import { SEARCH_KEYWORD_MAX_LENGTH } from '@constants/policy';

import searchIcon from '@assets/search_black.svg';

import * as S from './style';

interface SearchBarProps extends HTMLAttributes<HTMLInputElement> {
  size: Size | 'free';
  isOpen?: boolean;
}

export default function SearchBar({ size, isOpen, ...rest }: SearchBarProps) {
  const { currentKeyword } = useCurrentKeyword();
  const { keyword, handleKeywordChange, handleSearchSubmit, searchInputRef } =
    useSearch(currentKeyword);

  return (
    <S.Form size={size} action={PATH.SEARCH} onSubmit={handleSearchSubmit}>
      <S.Input
        ref={searchInputRef}
        maxLength={SEARCH_KEYWORD_MAX_LENGTH + 1}
        aria-label="게시글 제목 및 내용 검색창"
        type="search"
        value={keyword}
        onChange={handleKeywordChange}
        autoComplete="off"
        name={SEARCH_KEYWORD}
        {...rest}
      />
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
