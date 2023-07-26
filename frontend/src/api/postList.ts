import { PostInfo } from '@type/post';

import type { PostRequestKind, PostSorting, PostStatus } from '@components/post/PostListPage/types';

import {
  REQUEST_STATUS_OPTION,
  REQUEST_SORTING_OPTION,
  REQUEST_POST_KIND_URL,
} from '@constants/post';

import { getFetch } from '@utils/fetch';

interface PostListByOption {
  requestKind: PostRequestKind;
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
  categoryId?: number;
}

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export const makePostListUrl = ({
  requestKind,
  categoryId,
  postStatus,
  postSorting,
  pageNumber,
}: PostListByOption) => {
  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const POST_BASE_URL = `${BASE_URL}/${REQUEST_POST_KIND_URL[requestKind]}`;
  const OPTION_URL = `status=${requestedStatus}&sorting=${requestedSorting}&pages=${pageNumber}`;

  if (categoryId && requestKind === 'category') {
    return `${POST_BASE_URL}/${categoryId}?${OPTION_URL}`;
  }

  return `${POST_BASE_URL}?${OPTION_URL}`;
};

export const getPostList = async ({
  requestKind,
  postStatus,
  postSorting,
  pageNumber,
  categoryId,
}: PostListByOption) => {
  const postListUrl = makePostListUrl({
    requestKind,
    pageNumber,
    postSorting,
    postStatus,
    categoryId,
  });

  const postList = await getFetch<PostInfo[]>(postListUrl);

  return {
    pageNumber,
    postList,
  };
};
