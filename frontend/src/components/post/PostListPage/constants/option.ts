import type { PostSorting, PostStatus } from '../types/option';

export const STATUS_OPTION: Record<PostStatus, string> = {
  all: '전체',
  progress: '진행중',
  closed: '마감완료',
};

export const SORTING_OPTION: Record<PostSorting, string> = {
  popular: '인기순',
  latest: '최신순',
};
