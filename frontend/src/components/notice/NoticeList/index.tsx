import { StringDate } from '@type/time';

import NoticeItem from './NoticeItem';
import * as S from './style';

interface NoticeListProps {
  noticeList: {
    id: number;
    title: string;
    createdAt: StringDate;
  }[];
}

export default function NoticeList({ noticeList }: NoticeListProps) {
  return (
    <S.Container>
      {noticeList.map(notice => (
        <NoticeItem key={notice.id} {...notice} />
      ))}
    </S.Container>
  );
}
