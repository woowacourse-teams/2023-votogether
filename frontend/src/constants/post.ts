import { PostSorting, PostStatus } from '@components/post/PostListPage/types';

export const POST = {
  NOT_VOTE: 0,
};

export const REQUEST_STATUS_OPTION: Record<PostStatus, string> = {
  all: 'ALL',
  progress: 'PROGRESS',
  closed: 'CLOSED',
};

export const REQUEST_SORTING_OPTION: Record<PostSorting, string> = {
  latest: 'LATEST',
  popular: 'HOT',
};

export const CATEGORY_ID = 'categoryId';
