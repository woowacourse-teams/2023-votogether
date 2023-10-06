import { useSearchParams } from 'react-router-dom';

import { SEARCH_KEYWORD } from '@constants/api';
import { SEARCH_KEYWORD_MAX_LENGTH } from '@constants/policy';

import { getTrimmedWord } from '@utils/getTrimmedWord';

export const useCurrentKeyword = () => {
  const [searchParams] = useSearchParams();
  const currentKeyword =
    searchParams.get(SEARCH_KEYWORD)?.toString().slice(0, SEARCH_KEYWORD_MAX_LENGTH) ?? '';

  return {
    currentKeyword: currentKeyword !== '' ? getTrimmedWord(currentKeyword) : currentKeyword,
  };
};
