import { PostInfo } from '@type/post';

import type { PostSorting, PostStatus } from '@components/post/PostListPage/types';

import { REQUEST_STATUS_OPTION, REQUEST_SORTING_OPTION } from '@constants/post';

import { getFetch } from '@utils/fetch';

interface PostListByOption {
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
}

export const getPostList = async ({ postStatus, postSorting, pageNumber }: PostListByOption) => {
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
