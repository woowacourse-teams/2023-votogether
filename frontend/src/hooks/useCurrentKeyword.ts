import { useSearchParams } from 'react-router-dom';

import { DEFAULT_KEYWORD, SEARCH_KEYWORD, SEARCH_KEYWORD_MAX_LENGTH } from '@constants/post';

export const useCurrentKeyword = () => {
  const [searchParams] = useSearchParams();
  const currentKeyword =
    searchParams.get(SEARCH_KEYWORD)?.toString().slice(0, SEARCH_KEYWORD_MAX_LENGTH) ??
    DEFAULT_KEYWORD;

  return { currentKeyword };
};
