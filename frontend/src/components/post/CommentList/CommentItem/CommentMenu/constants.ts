import { CommentMenuItem } from './types';

export const COMMENT_MENU: Record<'NORMAL' | 'WRITER', CommentMenuItem[]> = {
  NORMAL: [{ color: 'black', content: '신고', action: 'report' }],
  WRITER: [
    { content: '수정', color: 'black', action: 'edit' },
    { content: '삭제', color: 'red', action: 'delete' },
  ],
};
