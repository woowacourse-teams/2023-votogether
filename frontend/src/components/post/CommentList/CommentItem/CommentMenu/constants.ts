import { CommentMenuItem } from './types';

export const COMMENT_MENU: Record<'NORMAL' | 'WRITER', CommentMenuItem[]> = {
  NORMAL: [{ color: 'black', content: '신고' }],
  WRITER: [
    { content: '수정', color: 'black' },
    { content: '삭제', color: 'red' },
  ],
};
