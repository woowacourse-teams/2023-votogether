import { CommentMenuItem } from './types';

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
