import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Notice } from '@type/notice';

import { useCreateNotice } from '@hooks';

import NoticeForm from '@components/notice/NoticeForm';
import { NOTICE_WRITE_TYPE } from '@components/notice/NoticeForm/constant';

import { PATH } from '@constants/path';

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
  const navigate = useNavigate();
  const { mutate, isSuccess } = useCreateNotice();

  useEffect(() => {
    if (isSuccess) {
      navigate(PATH.ADMIN_NOTICE);
    }
  }, [isSuccess, navigate]);

  return (
    <NoticeForm notice={defaultNotice} writeType={NOTICE_WRITE_TYPE.CREATE} writeNotice={mutate} />
  );
}
