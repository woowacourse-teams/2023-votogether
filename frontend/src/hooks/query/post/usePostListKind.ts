import { useLocation, useParams } from 'react-router-dom';

import { PostRequestKind } from '@components/post/PostListPage/types';

import { POST_CONTENT } from '@constants/post';

import { getPathFragment } from '@utils/getPathFragment';

const REQUEST_URL: Record<string, PostRequestKind> = {
  '/': POST_CONTENT.ALL,
  '/posts/category': POST_CONTENT.CATEGORY,
  '/users/posts': POST_CONTENT.MY_POST,
  '/users/votes': POST_CONTENT.MY_VOTE,
};

export const usePostListKind = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();

  const { pathname } = useLocation();

  const convertedPathname = getPathFragment(pathname);

  return { categoryId: Number(categoryId), content: REQUEST_URL[convertedPathname] };
};
