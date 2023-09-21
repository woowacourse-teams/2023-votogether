import cancel from '@assets/x_mark_black.svg';

import * as S from './style';

interface BannerProps {
  title: string;
  content: string;
  handleClose: () => void;
  path: string;
}
export default function Banner({ title, content, handleClose, path }: BannerProps) {
  return (
    <S.Wrapper>
      <S.IconImage src={cancel} alt="배너 닫기" onClick={handleClose} />
      <S.Content>
        <S.Title aria-label="배너 제목">{title}</S.Title>
        <S.Description aria-label="배너 내용">{content}</S.Description>
      </S.Content>
      <S.MovePageLink to={path} aria-label="세부 페이지로 이동">
        보러가기
      </S.MovePageLink>
    </S.Wrapper>
  );
}
