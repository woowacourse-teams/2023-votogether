import { PostInfo } from '@type/post';

import {
  PostStatusType,
  PostSortingType,
  STATUS_OPTION,
  SORTING_OPTION,
} from '@components/post/PostListPage/constants/option';

import { getFetch } from '@utils/fetch';

interface GetPostListParams {
  postStatus: PostStatusType;
  postSorting: PostSortingType;
  pages: number;
}

const REQUEST_STATUS_OPTION = {
  [STATUS_OPTION.all]: 'all',
  [STATUS_OPTION.progress]: 'progress',
  [STATUS_OPTION.closed]: 'closed',
};

const REQUEST_SORTING_OPTION = {
  [SORTING_OPTION.latest]: 'latest',
  [SORTING_OPTION.popular]: 'hot',
};

export const getPostList = async ({ postStatus, postSorting, pages }: GetPostListParams) => {
  const status = REQUEST_STATUS_OPTION[postStatus];
  const sorting = REQUEST_SORTING_OPTION[postSorting];

  return await getFetch<PostInfo[]>(`/posts?status=${status}&sorting=${sorting}&pages=${pages}`);
};
