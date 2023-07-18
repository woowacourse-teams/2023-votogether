const postStatus = ['all', 'progress', 'closed'] as const;
const sortingOption = ['popular', 'latest'] as const;

export type PostStatusType = (typeof postStatus)[number];
export type PostSortingType = (typeof sortingOption)[number];

export const STATUS_OPTION: Record<PostStatusType, string> = {
  all: '전체',
  progress: '진행중',
  closed: '마감완료',
};

export const SORTING_OPTION: Record<PostSortingType, string> = {
  popular: '인기순',
  latest: '최신순',
};
