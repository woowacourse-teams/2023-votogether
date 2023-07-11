import * as S from './style';

interface SquareButtonProps {
  theme: 'blank' | 'fill';
  children: string;
  clickEvent: () => void;
}

/* 마감시간, 확인, 취소 등 사용될 버튼
 * 부모에서 크기를 조절, 내용(children) 전달
 * props로 테마를 받음
 */
export default function SquareButton({ theme, children, clickEvent }: SquareButtonProps) {
  return (
    <S.Button theme={theme} onClick={clickEvent}>
      {children}
    </S.Button>
  );
}
