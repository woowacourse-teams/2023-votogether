import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { NoticeRequest } from '@type/notice';

import { useModifyNotice } from '@hooks';

import { MOCK_NOTICE_TEST } from '@mocks/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('요청을 통해 공지 사항을 수정하는 지 확인한다.', () => {
  test('공지 사항을 생성한다.', async () => {
    const data: NoticeRequest = {
      title: '아이폰입니다',
      content: '공지사항입니다',
      deadline: '2023-10-12 15:13',
      bannerTitle: '아이폰',
      bannerSubtitle: '공지사항입니다',
    };

    const { result } = renderHook(() => useModifyNotice(), {
      wrapper,
    });

    const { mutate } = result.current;

    await waitFor(() => {
      mutate({ notice: data, noticeId: 1 });

      expect(MOCK_NOTICE_TEST).toEqual(data.title);
    });
  });
});
