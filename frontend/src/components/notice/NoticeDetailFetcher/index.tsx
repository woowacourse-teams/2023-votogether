import { useNoticeDetail } from '@hooks';

import NoticeDetail from '../NoticeDetail';

export default function NoticeDetailFetcher({ noticeId }: { noticeId: number }) {
  const { data: notice } = useNoticeDetail(noticeId);

  if (!notice) return <></>;

  return <NoticeDetail notice={notice} />;
}
