export const STATUS = {
  ALL: 'all',
  PROGRESS: 'progress',
  CLOSED: 'closed',
} as const;

export const SORTING = {
  LATEST: 'latest',
  POPULAR: 'popular',
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
