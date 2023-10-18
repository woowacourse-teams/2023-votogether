import { useParams } from 'react-router-dom';

import { NoticeRequest } from '@type/notice';

import { useModifyNotice, useNoticeDetail } from '@hooks';

import AdminNoticeWrite from '../AdminNoticeWrite';

export default function AdminNoticeEdit() {
  const { noticeIdParam } = useParams() ?? 0;
  const noticeId = Number(noticeIdParam);

  const { data } = useNoticeDetail(noticeId);
  const { mutate } = useModifyNotice();

  if (!data) return <></>;

  return (
    <AdminNoticeWrite
      notice={data}
      writeNotice={() => (notice: NoticeRequest) => mutate({ noticeId, notice })}
      writeType="수정"
    />
  );
}
