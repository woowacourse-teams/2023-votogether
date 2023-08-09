import { PostInfoResponse, PostListByOptionalOption, PostListByRequiredOption } from '@type/post';

import {
  REQUEST_STATUS_OPTION,
  REQUEST_SORTING_OPTION,
  REQUEST_POST_KIND_URL,
  POST_TYPE,
  SEARCH_KEYWORD,
} from '@constants/post';

import { getFetch } from '@utils/fetch';

import { transformPostResponse } from './post';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const makePostListUrl = (
  requiredOption: PostListByRequiredOption,
  optionalOption: PostListByOptionalOption
) => {
  const { pageNumber, postSorting, postStatus, postType, isLoggedIn } = requiredOption;
  const { categoryId, keyword } = optionalOption;

  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const POST_BASE_URL = `${BASE_URL}/${REQUEST_POST_KIND_URL[postType]}${
    isLoggedIn ? '' : '/guest'
  }`;
  const OPTION_URL = `postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;

  if (categoryId > 0 && postType === POST_TYPE.CATEGORY) {
    return `${POST_BASE_URL}/?${OPTION_URL}&category=${categoryId}`;
  }

  if (postType === POST_TYPE.SEARCH) {
    return `${POST_BASE_URL}?${SEARCH_KEYWORD}=${keyword}&${OPTION_URL}`;
  }

  return `${POST_BASE_URL}?${OPTION_URL}`;
};

export const getPostList = async (
  requiredOption: PostListByRequiredOption,
  optionalOption: PostListByOptionalOption
) => {
  const { pageNumber } = requiredOption;

  const postListUrl = makePostListUrl(requiredOption, optionalOption);

  const postList = await getFetch<PostInfoResponse[]>(postListUrl);

  return {
    pageNumber,
    postList: postList.map(post => transformPostResponse(post)),
  };
};
