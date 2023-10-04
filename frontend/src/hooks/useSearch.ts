import { ChangeEvent, FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { SEARCH_KEYWORD_MAX_LENGTH } from '@constants/policy';

import { getTrimmedWord } from '@utils/getTrimmedWord';

import { useText } from './useText';

export const useSearch = (initialKeyword = '') => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { text: keyword, setText: setKeyword, handleTextChange } = useText(initialKeyword);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!searchInputRef.current) return;

    handleTextChange(event, { MAX_LENGTH: SEARCH_KEYWORD_MAX_LENGTH, MIN_LENGTH: 0 });
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInputRef.current) return;

    const trimmedKeyword = getTrimmedWord(keyword);

    if (keyword !== trimmedKeyword) {
      setKeyword(trimmedKeyword);
    }

    if (trimmedKeyword === '') {
      searchInputRef.current.setCustomValidity('검색어를 입력해주세요');
      searchInputRef.current.reportValidity();
      return;
    }

    navigate(`/search?keyword=${trimmedKeyword}`);
  };

  return { keyword, handleKeywordChange, handleSearchSubmit, searchInputRef };
};
