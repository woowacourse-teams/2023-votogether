import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { PostRequestKind } from '@components/post/PostListPage/types';

import { PATH } from '@constants/path';
import {
  DEFAULT_CATEGORY_ID,
  DEFAULT_KEYWORD,
  POST_TYPE,
  SEARCH_KEYWORD,
  SEARCH_KEYWORD_MAX_LENGTH,
} from '@constants/post';

import { getPathFragment } from '@utils/getPathFragment';

const REQUEST_URL: Record<string, PostRequestKind> = {
  [PATH.HOME]: POST_TYPE.ALL,
  [PATH.POST_CATEGORY]: POST_TYPE.CATEGORY,
  [PATH.USER_POST]: POST_TYPE.MY_POST,
  [PATH.USER_VOTE]: POST_TYPE.MY_VOTE,
  [PATH.SEARCH]: POST_TYPE.SEARCH,
};

export const usePostRequestInfo = () => {
  const params = useParams<{ categoryId?: string }>();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const categoryId = Number(params.categoryId ?? DEFAULT_CATEGORY_ID);
  const keyword =
    searchParams.get(SEARCH_KEYWORD)?.toString().slice(0, SEARCH_KEYWORD_MAX_LENGTH) ??
    DEFAULT_KEYWORD;
  const convertedPathname = getPathFragment(pathname);
  const postType = REQUEST_URL[convertedPathname];

  const postOptionalOption = {
    categoryId,
    keyword,
  };

  if (!postType) {
    return { postType: REQUEST_URL[PATH.HOME], postOptionalOption };
  }

  return { postType, postOptionalOption };
};
