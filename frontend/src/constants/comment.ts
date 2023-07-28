import { CommentMenuItem, CommentUser } from '@type/comment';

export const COMMENT_MAX_LENGTH = 200;

export const COMMENT_USER = {
  GUEST: 'guest',
  NORMAL: 'normal',
  WRITER: 'writer',
} as const;

export const COMMENT_USER_MENU: Record<CommentUser, keyof typeof COMMENT_MENU> = {
  [COMMENT_USER.GUEST]: 'NORMAL',
  [COMMENT_USER.NORMAL]: 'NORMAL',
  [COMMENT_USER.WRITER]: 'WRITER',
};

export const COMMENT_MENU: Record<'NORMAL' | 'WRITER', CommentMenuItem[]> = {
  NORMAL: [
    { color: 'black', content: '유저 신고', action: 'userReport' },
    { color: 'black', content: '댓글 신고', action: 'commentReport' },
  ],
  WRITER: [
    { content: '수정', color: 'black', action: 'edit' },
    { content: '삭제', color: 'red', action: 'delete' },
  ],
};
