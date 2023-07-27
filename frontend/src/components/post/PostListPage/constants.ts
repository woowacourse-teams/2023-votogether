import { SORTING, STATUS } from '@constants/post';

import { PostSorting, PostStatus } from './types';

export const STATUS_OPTION: Record<PostStatus, string> = {
  [STATUS.ALL]: '전체',
  [STATUS.PROGRESS]: '진행중',
  [STATUS.CLOSED]: '마감완료',
};

export const SORTING_OPTION: Record<PostSorting, string> = {
  [SORTING.POPULAR]: '인기순',
  [SORTING.LATEST]: '최신순',
};
