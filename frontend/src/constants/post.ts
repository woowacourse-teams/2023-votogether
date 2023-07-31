export const POST = {
  NOT_VOTE: 0,
};

export const STATUS = {
  ALL: 'all',
  PROGRESS: 'progress',
  CLOSED: 'closed',
} as const;

export const SORTING = {
  LATEST: 'latest',
  POPULAR: 'popular',
} as const;

export const POST_CONTENT = {
  ALL: 'posts',
  MY_POST: 'myPost',
  MY_VOTE: 'myVote',
  CATEGORY: 'category',
  SEARCH: 'search',
} as const;

export const REQUEST_STATUS_OPTION = {
  [STATUS.ALL]: 'ALL',
  [STATUS.PROGRESS]: 'PROGRESS',
  [STATUS.CLOSED]: 'CLOSED',
} as const;

export const REQUEST_SORTING_OPTION = {
  [SORTING.LATEST]: 'LATEST',
  [SORTING.POPULAR]: 'HOT',
} as const;

export const REQUEST_POST_KIND_URL = {
  [POST_CONTENT.ALL]: 'posts',
  [POST_CONTENT.MY_POST]: 'posts/me',
  [POST_CONTENT.MY_VOTE]: 'posts/votes/me',
  [POST_CONTENT.CATEGORY]: 'posts/categories',
  [POST_CONTENT.SEARCH]: 'posts/search',
} as const;

export const SEARCH_KEYWORD = 'keyword';
