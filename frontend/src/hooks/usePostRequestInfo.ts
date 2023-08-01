import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { PostRequestKind } from '@components/post/PostListPage/types';

import { PATH } from '@constants/path';
import { POST_TYPE, SEARCH_KEYWORD } from '@constants/post';

import { getPathFragment } from '@utils/getPathFragment';

const REQUEST_URL: Record<string, PostRequestKind> = {
  [PATH.HOME]: POST_TYPE.ALL,
  [PATH.POST_CATEGORY]: POST_TYPE.CATEGORY,
  [PATH.USER_POST]: POST_TYPE.MY_POST,
  [PATH.USER_VOTE]: POST_TYPE.MY_VOTE,
  [PATH.SEARCH]: POST_TYPE.SEARCH,
};

export const usePostRequestInfo = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [searchParams] = useSearchParams();

  const { pathname } = useLocation();
  const keyword = searchParams.get(SEARCH_KEYWORD)?.toString().slice(0, 100);

  const convertedPathname = getPathFragment(pathname);

  const postType = REQUEST_URL[convertedPathname];

  if (!postType) {
    return { categoryId: Number(categoryId), postType: REQUEST_URL[PATH.HOME], keyword };
  }

  return { categoryId: Number(categoryId), postType, keyword };
};
