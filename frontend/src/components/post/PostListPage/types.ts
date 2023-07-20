const POST_STATUS_LIST = ['all', 'progress', 'closed'] as const;
const POST_SORTING_LIST = ['popular', 'latest'] as const;

export type PostStatus = (typeof POST_STATUS_LIST)[number];
export type PostSorting = (typeof POST_SORTING_LIST)[number];
