import { PostInfo, PostListByOption } from '@type/post';

import {
  REQUEST_STATUS_OPTION,
  REQUEST_SORTING_OPTION,
  REQUEST_POST_KIND_URL,
  POST_CONTENT,
  SEARCH_KEYWORD,
} from '@constants/post';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_MOCKING_URL;

export const makePostListUrl = ({
  content,
  categoryId,
  postStatus,
  postSorting,
  pageNumber,
  keyword,
}: PostListByOption) => {
  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const POST_BASE_URL = `${BASE_URL}/${REQUEST_POST_KIND_URL[content]}`;
  const OPTION_URL = `postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;

  if (categoryId && content === POST_CONTENT.CATEGORY) {
    return `${POST_BASE_URL}/${categoryId}?${OPTION_URL}`;
  }

  if (content === POST_CONTENT.SEARCH) {
    return `${POST_BASE_URL}?${SEARCH_KEYWORD}=${keyword}&${OPTION_URL}`;
  }

  return `${POST_BASE_URL}?${OPTION_URL}`;
};

export const getPostList = async ({
  content,
  postStatus,
  postSorting,
  pageNumber,
  categoryId,
  keyword,
}: PostListByOption) => {
  const postListUrl = makePostListUrl({
    content,
    pageNumber,
    postSorting,
    postStatus,
    categoryId,
    keyword,
  });

  const postList = await getFetch<PostInfo[]>(postListUrl);

  return {
    pageNumber,
    postList,
  };
};
