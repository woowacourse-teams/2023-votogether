import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useStackedNoticeList } from '@hooks';

import { MOCK_TRANSFORM_NOTICE_LIST } from '@mocks/mockData/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('더보기 버튼을 눌러 공지 사항 리스트 데이터를 불러와서 여러 페이지의 데이터를 가지고 있는 지 확인한다..', () => {
  test('공지 사항 목록 0 페이지를 불러온다.', async () => {
    const { result } = renderHook(() => useStackedNoticeList(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
    });
  });

  test('공지 사항 목록 0 페이지를 불러온다. 그리고 다음 페이지를 불러온다', async () => {
    const { result } = renderHook(() => useStackedNoticeList(), {
      wrapper,
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.data?.pages[0]).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
      expect(result.current.data?.pages[1]).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
    });
  });
});
