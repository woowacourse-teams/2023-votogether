import type { CommentAction, CommentMenu, CommentUser, MenuItem } from '@type/menu';

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

export const COMMENT_USER = {
  GUEST: 'GUEST',
  NOT_WRITER: 'NOT_WRITER',
  WRITER: 'WRITER',
} as const;

export const COMMENT_ACTION = {
  DELETE: 'delete',
  USER_REPORT: 'userReport',
  COMMENT_REPORT: 'commentReport',
  EDIT: 'edit',
} as const;

export const COMMENT_USER_MENU: Record<CommentUser, CommentMenu> = {
  [COMMENT_USER.GUEST]: COMMENT_USER.NOT_WRITER,
  [COMMENT_USER.NOT_WRITER]: COMMENT_USER.NOT_WRITER,
  [COMMENT_USER.WRITER]: COMMENT_USER.WRITER,
} as const;

export const COMMENT_MENU: Record<CommentMenu, MenuItem<CommentAction>[]> = {
  [COMMENT_USER.NOT_WRITER]: [
    { color: 'black', content: '닉네임 신고', action: COMMENT_ACTION.USER_REPORT },
    { color: 'black', content: '댓글 신고', action: COMMENT_ACTION.COMMENT_REPORT },
  ],
  [COMMENT_USER.WRITER]: [
    { content: '수정', color: 'black', action: COMMENT_ACTION.EDIT },
    { content: '삭제', color: 'red', action: COMMENT_ACTION.DELETE },
  ],
};
