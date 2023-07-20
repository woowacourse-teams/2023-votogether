import { PostInfo } from '@type/post';

import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import { getFetch } from '@utils/fetch';

interface PostListByOption {
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
  categoryId?: number;
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

const getPostListUrl = ({ categoryId, postStatus, postSorting, pageNumber }: PostListByOption) => {
  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  if (categoryId) {
    return `/posts?categoryId=${categoryId}&status=${requestedStatus}&sorting=${requestedSorting}&pages=${pageNumber}`;
  }

  return `/posts?status=${requestedStatus}&sorting=${requestedSorting}&pages=${pageNumber}`;
};

export const getPostList = async ({
  postStatus,
  postSorting,
  pageNumber,
  categoryId,
}: PostListByOption) => {
  const postListUrl = getPostListUrl({ pageNumber, postSorting, postStatus, categoryId });

  const postList = await getFetch<PostInfo[]>(postListUrl);

  return {
    pageNumber,
    postList,
  };
};
