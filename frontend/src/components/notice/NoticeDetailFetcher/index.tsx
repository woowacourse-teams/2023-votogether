import { useParams } from 'react-router-dom';

import { useNoticeDetail } from '@hooks';

import NoticeDetail from '../NoticeDetail';

export default function NoticeDetailFetcher() {
  const { noticeId: NoticeIdParam } = useParams();
  const noticeId = Number(NoticeIdParam) ?? 0;

  const { data: notice } = useNoticeDetail(noticeId);

  if (!notice) return <></>;

  return <NoticeDetail notice={notice} />;
}
