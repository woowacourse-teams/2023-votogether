import { Notice } from '@type/notice';

import { PATH } from '@constants/path';

import * as S from './style';

interface NoticeItemProps {
  notice: Notice;
}
export default function NoticeItem({ notice: { id, title, createdAt } }: NoticeItemProps) {
  return (
    <S.Container>
      <S.DetailLink to={`${PATH.NOTICES}/${id}`}>
        <S.Title>{title}</S.Title>
        <S.CreatedAt>{createdAt}</S.CreatedAt>
      </S.DetailLink>
    </S.Container>
  );
}
