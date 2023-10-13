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

describe('usePagedNoticeList 훅이 공지 사항 리스트를 페이지 버튼을 눌러 불러오는 지 확인한다.', () => {
  test('초기 설정으로는 0 페이지를 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    waitFor(() => {
      expect(result.current.page).toEqual(0);
    });
  });

  test('현재 페이지를 3으로 설정했을 때 3페이지를 데이터만 불러온다. 클라이언트 측에서 3으로 설정했어도 서버로는 2를 보내야 하기 때문에 현재 페이지는 2로 설정된다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    act(() => {
      result.current.setPage(3);
    });

    waitFor(() => {
      expect(result.current.page).toEqual(2);
    });
  });

  test('현재 페이지가 0이고, 다음 페이지를 불러올 때 현재 페이지 + 1을 하여 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    const currentPage = result.current.page;

    act(() => {
      result.current.fetchNextPage();
    });

    waitFor(() => {
      expect(result.current.page).toEqual(currentPage + 1);
    });
  });

  test('총 페이지보다 현재 페이지가 작다면 다음 페이지 여부를 반환하는 변수가 true로 동작한다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    const totalPage = MOCK_TRANSFORM_NOTICE_LIST.totalPageNumber;

    const currentPage = result.current.page;

    act(() => {
      result.current.setPage(totalPage + 1);
    });

    waitFor(() => {
      expect(totalPage > currentPage).toBe(true);
      expect(result.current.hasNextPage).toBe(true);
    });
  });

  test('총 페이지와 현재 페이지가 같다면 다음 페이지 여부를 반환하는 변수가 false로 동작한다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    const totalPage = MOCK_TRANSFORM_NOTICE_LIST.totalPageNumber;

    const currentPage = result.current.page;

    act(() => {
      result.current.setPage(totalPage + 1);
    });

    waitFor(() => {
      expect(totalPage === currentPage).toBe(true);
      expect(result.current.hasNextPage).toBe(false);
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

    result.current.setPage(3);

    act(() => {
      expect(result.current.data).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
    });
  });
});
