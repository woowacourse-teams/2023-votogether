import * as S from './style';

interface HeaderTextButtonProps {
  children: string;
  clickEvent: () => void;
}

/* 헤더에 포함되어 취소, 확인, 신고 등 사용될 버튼
 * props로 s/m/l 크기를 받음
 */
export default function HeaderTextButton({ children, clickEvent }: HeaderTextButtonProps) {
  return <S.Button onClick={clickEvent}>{children}</S.Button>;
}
