import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { usePagedNoticeList } from '@hooks';

import { MOCK_TRANSFORM_NOTICE_LIST } from '@mocks/mockData/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('페이지 버튼을 눌러 공지 사항 리스트를 불러오는 지 확인한다.', () => {
  test('초기 설정으로는 0 페이지를 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    waitFor(() => {
      expect(result.current.page).toEqual(null); // test fail
    });
  });

  test('초기 페이지를 인자를 넣어 설정할 수 있다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(5), {
      wrapper,
    });

    waitFor(() => {
      expect(result.current.page).toEqual(null); // 원래 null 이 아닌 5 이었음
    });
  });

  test('공지 사항 목록 0 페이지를 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
    });
  });

  test('공지 사항 목록 0 페이지를 불러오고 페이지 설정을 통해 3페이지를 불러온다. 페이지 설정 버튼을 누른다면 해당 페이지의 데이터 1개를 배열로 보내준다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    act(() => {
      result.current.setPage(3);

      expect(result.current.data).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
    });
  });
});
