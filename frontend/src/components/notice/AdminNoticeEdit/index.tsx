import { useParams } from 'react-router-dom';

import { NoticeRequest } from '@type/notice';

import { useModifyNotice, useNoticeDetail } from '@hooks';

import NoticeForm from '../NoticeForm';
import { NOTICE_WRITE_TYPE } from '../NoticeForm/constant';

export default function AdminNoticeEdit() {
  const { noticeId: noticeIdParam } = useParams() ?? 0;
  const noticeId = Number(noticeIdParam);

  const { data } = useNoticeDetail(noticeId);
  const { mutate } = useModifyNotice();

  if (!data) return <></>;

  return (
    <NoticeForm
      notice={data}
      writeNotice={() => (notice: NoticeRequest) => mutate({ noticeId, notice })}
      writeType={NOTICE_WRITE_TYPE.EDIT}
    />
  );
}
