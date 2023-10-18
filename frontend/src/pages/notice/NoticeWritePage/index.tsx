import { Notice } from '@type/notice';

import { useCreateNotice } from '@hooks';

import AdminNoticeWrite from '@components/notice/AdminNoticeWrite';
import { NOTICE_WRITE_TYPE } from '@components/notice/AdminNoticeWrite/constant';

import { addTimeToDate } from '@utils/post/addTimeToDate';

const defaultNotice: Notice = {
  id: 0,
  title: '',
  bannerSubtitle: '',
  bannerTitle: '',
  content: '',
  createdAt: '0000-00-00',
  deadline: addTimeToDate({ day: 0, hour: 0, minute: 0 }, new Date()),
};

export default function NoticeWritePage() {
  const { mutate } = useCreateNotice();

  return (
    <AdminNoticeWrite
      notice={defaultNotice}
      writeType={NOTICE_WRITE_TYPE.CREATE}
      writeNotice={mutate}
    />
  );
}
