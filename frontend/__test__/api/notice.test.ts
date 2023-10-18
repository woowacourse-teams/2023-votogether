import { NoticeRequest } from '@type/notice';

import {
  createNotice,
  deleteNotice,
  getBannerNotice,
  getNoticeDetail,
  getNoticeList,
  modifyNotice,
} from '@api/notice';

import { MOCK_TRANSFORM_NOTICE, MOCK_TRANSFORM_NOTICE_LIST } from '@mocks/mockData/notice';
import { MOCK_NOTICE_TEST } from '@mocks/notice';

describe('서버와 통신하여 공지사항 관련된 api를 통신할 수 있어야 한다. ', () => {
  test('공지사항을 생성한다.', async () => {
    const data: NoticeRequest = {
      title: '갤럭시',
      content: '공지사항입니다',
      deadline: '2023-10-12 15:13',
      bannerTitle: '아이폰',
      bannerSubtitle: '공지사항입니다',
    };

    await createNotice(data);

    const result = MOCK_NOTICE_TEST;

    expect(result).toBe(data.title);
  });

  test('배너 공지 사항을 조회한다.', async () => {
    const result = await getBannerNotice();

    expect(result).toEqual(MOCK_TRANSFORM_NOTICE);
  });

  test('공지 사항 목록을 조회한다.', async () => {
    const result = await getNoticeList(0);

    expect(result).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
  });

  test('공지 사항의 상세 내용을 조회한다.', async () => {
    const result = await getNoticeDetail(1);

    expect(result).toEqual(MOCK_TRANSFORM_NOTICE);
  });

  test('공지 사항의 createdAt을 날짜만 받도록 변환시킨다.', async () => {
    const createdAt = '2023-08-19 08:23';
    const result = '2023-08-19';

    expect(createdAt.split(' ')[0]).toBe(result);
  });

  test('공지 사항을 수정한다.', async () => {
    const data: NoticeRequest = {
      title: '아이폰입니다',
      content: '공지사항입니다',
      deadline: '2023-10-12 15:13',
      bannerTitle: '아이폰',
      bannerSubtitle: '공지사항입니다',
    };

    await modifyNotice({ noticeId: 0, notice: data });

    const result = MOCK_NOTICE_TEST;

    expect(result).toBe(data.title);
  });

  test('공지 사항을 삭제한다.', async () => {
    await deleteNotice(1);

    const result = MOCK_NOTICE_TEST;

    expect(result).toBe('삭제된 공지사항');
  });
});
