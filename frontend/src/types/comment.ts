import { COMMENT_USER, COMMENT_USER_MENU } from '@constants/comment';

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

export type CommentAction = 'delete' | 'userReport' | 'commentReport' | 'edit';

export type CommentUser = (typeof COMMENT_USER)[keyof typeof COMMENT_USER];

export interface CommentMenuItem {
  content: string;
  color: 'black' | 'red';
  action: CommentAction;
}
