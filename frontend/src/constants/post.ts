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

export const POST_TYPE = {
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
  [POST_TYPE.ALL]: 'posts',
  [POST_TYPE.MY_POST]: 'posts/me',
  [POST_TYPE.MY_VOTE]: 'posts/votes/me',
  [POST_TYPE.CATEGORY]: 'posts',
  [POST_TYPE.SEARCH]: 'posts/search',
} as const;

export const SEARCH_KEYWORD = 'keyword';

export const MAX_FILE_SIZE = 5000000;

export const POST_TITLE = {
  MAX_LENGTH: 100,
  MIN_LENGTH: 2,
} as const;

export const POST_CONTENT = {
  MAX_LENGTH: 1000,
  MIN_LENGTH: 2,
} as const;

export const POST_DESCRIPTION_MAX_LENGTH = 1000;

export const SEARCH_KEYWORD_MAX_LENGTH = 100;

export const POST_LIST_MAX_LENGTH = 10;

export const DEFAULT_CATEGORY_ID = 0;

export const DEFAULT_KEYWORD = '';

export const CATEGORY_COUNT_LIMIT = 3;
