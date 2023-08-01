import { PostInfo, PostListByOption } from '@type/post';

import {
  REQUEST_STATUS_OPTION,
  REQUEST_SORTING_OPTION,
  REQUEST_POST_KIND_URL,
} from '@constants/post';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export const makePostListUrl = ({
  content,
  categoryId,
  postStatus,
  postSorting,
  pageNumber,
}: PostListByOption) => {
  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const POST_BASE_URL = `${BASE_URL}/${REQUEST_POST_KIND_URL[content]}`;
  const OPTION_URL = `postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;

  if (categoryId && content === 'category') {
    return `${POST_BASE_URL}/${categoryId}?${OPTION_URL}`;
  }

  return `${POST_BASE_URL}?${OPTION_URL}`;
};

export const getPostList = async ({
  content,
  postStatus,
  postSorting,
  pageNumber,
  categoryId,
}: PostListByOption) => {
  const postListUrl = makePostListUrl({
    content,
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
