import { PostInfo } from '@type/post';

import type { PostSorting, PostStatus } from '@components/post/PostListPage/types/option';

import { getFetch } from '@utils/fetch';

interface GetPostListParams {
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
}

const REQUEST_STATUS_OPTION: Record<PostStatus, string> = {
  all: 'ALL',
  progress: 'PROGRESS',
  closed: 'CLOSED',
};

const REQUEST_SORTING_OPTION: Record<PostSorting, string> = {
  latest: 'LATEST',
  popular: 'HOT',
};

export const getPostList = async ({ postStatus, postSorting, pageNumber }: GetPostListParams) => {
  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const postList = await getFetch<PostInfo[]>(
    `/posts?status=${requestedStatus}&sorting=${requestedSorting}&pages=${pageNumber}`
  );
  return {
    pageNumber,
    postList,
  };
};
