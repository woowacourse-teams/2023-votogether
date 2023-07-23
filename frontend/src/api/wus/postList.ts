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

export const makePostListUrl = ({
  categoryId,
  postStatus,
  postSorting,
  pageNumber,
}: PostListByOption) => {
  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const OPTION_URL = `status=${requestedStatus}&sorting=${requestedSorting}&pages=${pageNumber}`;

  if (categoryId) {
    return `/posts?categoryId=${categoryId}&${OPTION_URL}`;
  }

  return `/posts?${OPTION_URL}`;
};

export const getPostList = async ({
  postStatus,
  postSorting,
  pageNumber,
  categoryId,
}: PostListByOption) => {
  const postListUrl = makePostListUrl({ pageNumber, postSorting, postStatus, categoryId });

  const postList = await getFetch<PostInfo[]>(postListUrl);

  return {
    pageNumber,
    postList,
  };
};
