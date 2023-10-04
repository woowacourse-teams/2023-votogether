import { COMMENT_ACTION, COMMENT_USER } from '@constants/post';

export type MenuColor = 'black' | 'red';

//메뉴 컴포넌트에서 사용하는 기본적인 인터페이스
interface MenuItem {
  content: string;
  color: MenuColor;
  action: string;
}

export type CommentAction = (typeof COMMENT_ACTION)[keyof typeof COMMENT_ACTION];

export type PostAction = 'NICKNAME_REPORT' | 'POST_REPORT' | 'DELETE' | CommentAction;

//게시글 메뉴 컴포넌트에서 사용하는 확장된 인터페이스 (action을 제한)
export interface PostMenuItem extends MenuItem {
  action: PostAction;
}

export type CommentUser = (typeof COMMENT_USER)[keyof typeof COMMENT_USER];

export type CommentMenu = Exclude<CommentUser, 'GUEST'>;

export interface CommentMenuItem {
  content: string;
  color: 'black' | 'red';
  action: CommentAction;
}
