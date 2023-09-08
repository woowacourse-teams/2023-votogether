import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearch = (initialKeyword = '') => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState(initialKeyword);

  const onKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!searchInputRef.current) return;

    setKeyword(event.currentTarget.value);
    searchInputRef.current.setCustomValidity('');
  };

  const onSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInputRef.current) return;

    const trimmedKeyword = keyword.trim();

    if (trimmedKeyword === '') {
      searchInputRef.current.setCustomValidity('검색어를 입력해주세요');
      searchInputRef.current.reportValidity();
      return;
    }

    navigate(`/search?keyword=${trimmedKeyword}`);
  };

  return { keyword, onKeywordChange, onSearchSubmit, searchInputRef };
};
