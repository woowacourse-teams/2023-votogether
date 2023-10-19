import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NoticeRequest } from '@type/notice';

import { useModifyNotice, useNoticeDetail } from '@hooks';

import { PATH } from '@constants/path';

import NoticeForm from '../NoticeForm';
import { NOTICE_WRITE_TYPE } from '../NoticeForm/constant';

export default function AdminNoticeEdit() {
  const navigate = useNavigate();
  const { noticeId: noticeIdParam } = useParams() ?? 0;
  const noticeId = Number(noticeIdParam);

  const { data } = useNoticeDetail(noticeId);
  const { mutate, isSuccess } = useModifyNotice();

  useEffect(() => {
    if (isSuccess) {
      navigate(PATH.ADMIN_NOTICE);
    }
  }, [isSuccess, navigate]);

  if (!data) return <></>;

  return (
    <NoticeForm
      notice={data}
      writeNotice={(notice: NoticeRequest) => mutate({ noticeId, notice })}
      writeType={NOTICE_WRITE_TYPE.EDIT}
    />
  );
}
