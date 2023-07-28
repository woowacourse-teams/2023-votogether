import { useLocation, useParams } from 'react-router-dom';

import { PostRequestKind } from '@components/post/PostListPage/types';

import { PATH } from '@constants/path';
import { POST_CONTENT } from '@constants/post';

import { getPathFragment } from '@utils/getPathFragment';

const REQUEST_URL: Record<string, PostRequestKind> = {
  [PATH.HOME]: POST_CONTENT.ALL,
  [PATH.POST_CATEGORY]: POST_CONTENT.CATEGORY,
  [PATH.USER_POST]: POST_CONTENT.MY_POST,
  [PATH.USER_VOTE]: POST_CONTENT.MY_VOTE,
};

export const usePostRequestInfo = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();

  const { pathname } = useLocation();

  const convertedPathname = getPathFragment(pathname);

  return { categoryId: Number(categoryId), content: REQUEST_URL[convertedPathname] };
};
