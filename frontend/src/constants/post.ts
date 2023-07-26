export const POST = {
  NOT_VOTE: 0,
};

export const REQUEST_STATUS_OPTION = {
  all: 'ALL',
  progress: 'PROGRESS',
  closed: 'CLOSED',
} as const;

export const REQUEST_SORTING_OPTION = {
  latest: 'LATEST',
  popular: 'HOT',
} as const;

export const REQUEST_POST_KIND_URL = {
  all: 'posts',
  myPost: 'posts/me',
  myVote: 'posts/votes/me',
  category: 'posts/categories',
} as const;
