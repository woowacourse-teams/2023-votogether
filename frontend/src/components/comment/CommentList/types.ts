import { COMMENT_ACTION, COMMENT_USER } from './constants';

export type CommentAction = (typeof COMMENT_ACTION)[keyof typeof COMMENT_ACTION];

export type CommentUser = (typeof COMMENT_USER)[keyof typeof COMMENT_USER];

export type CommentMenu = Exclude<CommentUser, 'GUEST'>;

export interface CommentMenuItem {
  content: string;
  color: 'black' | 'red';
  action: CommentAction;
}
