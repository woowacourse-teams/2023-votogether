export type MenuColor = 'black' | 'red';

//메뉴 컴포넌트에서 사용하는 기본적인 인터페이스
interface MenuItem {
  content: string;
  color: MenuColor;
  action: string;
}

export type PostAction = 'NICKNAME_REPORT' | 'POST_REPORT' | 'DELETE';

//게시글 메뉴 컴포넌트에서 사용하는 확장된 인터페이스 (action을 제한)
export interface PostMenuItem extends MenuItem {
  action: PostAction;
}
