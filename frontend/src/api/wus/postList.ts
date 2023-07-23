import { PostInfo } from '@type/post';

import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import { REQUEST_STATUS_OPTION, REQUEST_SORTING_OPTION } from '@constants/post';

import { getFetch } from '@utils/fetch';

interface PostListByOption {
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
  categoryId?: number;
}

export const getPostListUrl = ({
  categoryId,
  postStatus,
  postSorting,
  pageNumber,
}: PostListByOption) => {
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
