import { COMMENT_ACTION, COMMENT_MENU_KIND, COMMENT_USER } from '@constants/comment';

export interface Comment {
  id: number;
  member: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: string;
  isEdit: boolean;
}

export interface CommentResponse {
  id: number;
  member: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CommentAction = (typeof COMMENT_ACTION)[keyof typeof COMMENT_ACTION];

export type CommentUser = (typeof COMMENT_USER)[keyof typeof COMMENT_USER];

export type CommentMenu = (typeof COMMENT_MENU_KIND)[keyof typeof COMMENT_MENU_KIND];

export interface CommentMenuItem {
  content: string;
  color: 'black' | 'red';
  action: CommentAction;
}
