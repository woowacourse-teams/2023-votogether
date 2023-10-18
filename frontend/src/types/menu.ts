import { COMMENT_ACTION, COMMENT_USER } from '@constants/post';

export type MenuColor = 'black' | 'red';
export interface MenuItem<T> {
  content: string;
  color: MenuColor;
  action: T;
}

export type CommentAction = (typeof COMMENT_ACTION)[keyof typeof COMMENT_ACTION];

export type PostAction = 'NICKNAME_REPORT' | 'POST_REPORT' | 'DELETE' | 'EDIT';

export type CommentUser = (typeof COMMENT_USER)[keyof typeof COMMENT_USER];

export type CommentMenu = Exclude<CommentUser, 'GUEST'>;
