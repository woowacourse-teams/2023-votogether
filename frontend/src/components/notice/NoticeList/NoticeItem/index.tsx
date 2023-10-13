import { PATH } from '@constants/path';

import * as S from './style';

interface NoticeItemProps {
  id: number;
  title: string;
  /**
   * yyyy-mm-dd 형식
   */
  createdAt: string;
}
export default function NoticeItem({ id, title, createdAt }: NoticeItemProps) {
  return (
    <S.Container>
      <S.DetailLink to={`${PATH.NOTICES}/${id}`}>
        <S.Title>{title}</S.Title>
        <S.CreatedAt>{createdAt}</S.CreatedAt>
      </S.DetailLink>
    </S.Container>
  );
}
