import { PostInfo } from '@type/post';

import { PostStatusType, PostSortingType } from '@components/post/PostListPage/constants/option';

import { getFetch } from '@utils/fetch';

interface GetPostListParams {
  postStatus: PostStatusType;
  postSorting: PostSortingType;
  pages: number;
}

const REQUEST_STATUS_OPTION = {
  all: 'all',
  progress: 'progress',
  closed: 'closed',
};

const REQUEST_SORTING_OPTION = {
  latest: 'latest',
  popular: 'hot',
};

const transformPostListResponse = (postList: PostInfo[], pageNumber: number) => {
  return {
    pageNumber,
    postList,
  };
};

export const getPostList = async ({ postStatus, postSorting, pages }: GetPostListParams) => {
  const status = REQUEST_STATUS_OPTION[postStatus];
  const sorting = REQUEST_SORTING_OPTION[postSorting];

  const postList = await getFetch<PostInfo[]>(
    `/posts?status=${status}&sorting=${sorting}&pages=${pages}`
  );

  return transformPostListResponse(postList, pages);
};
