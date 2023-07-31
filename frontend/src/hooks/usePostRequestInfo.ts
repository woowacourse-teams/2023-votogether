import { useLocation, useParams, useSearchParams } from 'react-router-dom';

import { PostRequestKind } from '@components/post/PostListPage/types';

import { PATH } from '@constants/path';
import { POST_CONTENT, SEARCH_KEYWORD } from '@constants/post';

import { getPathFragment } from '@utils/getPathFragment';

const REQUEST_URL: Record<string, PostRequestKind> = {
  [PATH.HOME]: POST_CONTENT.ALL,
  [PATH.POST_CATEGORY]: POST_CONTENT.CATEGORY,
  [PATH.USER_POST]: POST_CONTENT.MY_POST,
  [PATH.USER_VOTE]: POST_CONTENT.MY_VOTE,
  [PATH.SEARCH]: POST_CONTENT.SEARCH,
};

export const usePostRequestInfo = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [searchParams] = useSearchParams();

  const { pathname } = useLocation();
  const keyword = searchParams.get(SEARCH_KEYWORD)?.toString();

  const convertedPathname = getPathFragment(pathname);

  const content = REQUEST_URL[convertedPathname];

  if (!content) {
    return { categoryId: Number(categoryId), content: REQUEST_URL[PATH.HOME], keyword };
  }

  return { categoryId: Number(categoryId), content, keyword };
};
