import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SEARCH_KEYWORD_MAX_LENGTH } from '@constants/post';

import { getTrimmedWord } from '@utils/getTrimmedWord';

export const useSearch = (initialKeyword = '') => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState(initialKeyword);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!searchInputRef.current) return;

    if (event.currentTarget.value.length > SEARCH_KEYWORD_MAX_LENGTH) {
      searchInputRef.current.setCustomValidity(
        `검색어는 ${SEARCH_KEYWORD_MAX_LENGTH}자까지 입력 가능합니다.`
      );
      searchInputRef.current.reportValidity();

      return;
    }

    setKeyword(event.currentTarget.value);
    searchInputRef.current.setCustomValidity('');
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
