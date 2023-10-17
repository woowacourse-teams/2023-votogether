import { StringDate } from '@type/time';

import { PATH } from '@constants/path';

import * as S from './style';

interface NoticeItemProps {
  id: number;
  title: string;
  /**
   * yyyy-mm-dd 형식
   */
  createdAt: StringDate;
}
export default function NoticeItem({ id, title, createdAt }: NoticeItemProps) {
  const createdDate = createdAt.slice(0, 10);

  return (
    <S.Container>
      <S.DetailLink to={`${PATH.NOTICES}/${id}`}>
        <S.Title>{title}</S.Title>
        <S.CreatedAt>{createdDate}</S.CreatedAt>
      </S.DetailLink>
    </S.Container>
  );
}
