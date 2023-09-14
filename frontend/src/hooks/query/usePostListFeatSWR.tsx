import useSWRInfinite from 'swr/infinite';

import { PostInfoResponse, PostListByOptionalOption, PostListByRequiredOption } from '@type/post';

import { transformPostResponse } from '@api/post';

import {
  POST_LIST_MAX_LENGTH,
  POST_TYPE,
  REQUEST_POST_KIND_URL,
  REQUEST_SORTING_OPTION,
  REQUEST_STATUS_OPTION,
  SEARCH_KEYWORD,
} from '@constants/post';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const makePostListUrl =
  (pageIndex: number) =>
  (requiredOption: PostListByRequiredOption, optionalOption: PostListByOptionalOption) => {
    const { postSorting, postStatus, postType, isLoggedIn } = requiredOption;
    const { categoryId, keyword } = optionalOption;

    const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
    const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

    const POST_BASE_URL = `${BASE_URL}/${REQUEST_POST_KIND_URL[postType]}${
      isLoggedIn ? '' : '/guest'
    }`;
    const OPTION_URL = `postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageIndex}`;

    if (categoryId > 0 && postType === POST_TYPE.CATEGORY) {
      return `${POST_BASE_URL}?${OPTION_URL}&category=${categoryId}`;
    }

    if (postType === POST_TYPE.SEARCH) {
      return `${POST_BASE_URL}?${SEARCH_KEYWORD}=${keyword}&${OPTION_URL}`;
    }

    return `${POST_BASE_URL}?${OPTION_URL}`;
  };

export const usePostListFeatSWR = (
  requiredOption: Omit<PostListByRequiredOption, 'pageNumber'>,
  optionalOption: PostListByOptionalOption
) => {
  const { data, size, isLoading, setSize } = useSWRInfinite(
    index => makePostListUrl(index)({ ...requiredOption, pageNumber: 0 }, optionalOption),
    fetcher
  );

  const issues: PostInfoResponse[] = data ? [].concat(...data) : [];
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < POST_LIST_MAX_LENGTH);
  const fetchNextPage = () => setSize(size + 1);

  return {
    data: issues.map(post => transformPostResponse(post)),
    hasNextPage: !isReachingEnd,
    fetchNextPage,
    isFetchingNextPage: isLoadingMore,
    isPostListEmpty: issues.length === 0,
  };
};
