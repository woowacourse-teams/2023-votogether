import { COMMENT_MENU } from './CommentMenu/constants';
import { CommentUser } from './types';

export const COMMENT_USER_MENU: Record<CommentUser, keyof typeof COMMENT_MENU> = {
  guest: 'NORMAL',
  normal: 'NORMAL',
  writer: 'WRITER',
};
