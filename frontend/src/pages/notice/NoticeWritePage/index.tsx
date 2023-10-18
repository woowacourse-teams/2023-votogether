import { Notice } from '@type/notice';

import { useCreateNotice } from '@hooks';

import AdminNoticeWrite from '@components/notice/AdminNoticeWrite';

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

  return <AdminNoticeWrite notice={defaultNotice} writeType="작성" writeNotice={mutate} />;
}
