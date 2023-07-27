import { useLocation, useParams } from 'react-router-dom';

import { PostRequestKind } from '@components/post/PostListPage/types';

import { getPathFragment } from '@utils/getPathFragment';

const REQUEST_URL: Record<string, PostRequestKind> = {
  '/': 'all',
  '/posts/category': 'category',
  '/users/posts': 'myPost',
  '/users/votes': 'myVote',
};

export const usePostListKind = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();

  const { pathname } = useLocation();

  const convertedPathname = getPathFragment(pathname);

  return { categoryId: Number(categoryId), content: REQUEST_URL[convertedPathname] };
};
