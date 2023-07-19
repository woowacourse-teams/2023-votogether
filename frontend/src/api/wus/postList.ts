import { PostInfo } from '@type/post';

import { PostStatusType, PostSortingType } from '@components/post/PostListPage/constants/option';

import { getFetch } from '@utils/fetch';

interface GetPostListParams {
  postStatus: PostStatusType;
  postSorting: PostSortingType;
  pageNumber: number;
}

const REQUEST_STATUS_OPTION = {
  all: 'ALL',
  progress: 'PROGRESS',
  closed: 'CLOSED',
};

const REQUEST_SORTING_OPTION = {
  latest: 'latest',
  popular: 'hot',
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
