import { Notice } from '@type/notice';

import NoticeItem from './NoticeItem';
import * as S from './style';

interface NoticeListProps {
  noticeList: Notice[];
}

export default function NoticeList({ noticeList }: NoticeListProps) {
  return (
    <S.Container>
      {noticeList.map(notice => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </S.Container>
  );
}
