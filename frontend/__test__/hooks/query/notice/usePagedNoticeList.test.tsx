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
      expect(result.current.page).toEqual(0);
    });
  });

  test('초기 페이지를 인자를 넣어 설정할 수 있다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(5), {
      wrapper,
    });

    waitFor(() => {
      expect(result.current.page).toEqual(5);
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

  test('현재 페이지가 0이고, 다음 페이지를 불러올 때 현재 페이지의 시작 페이지 번호 + 5 을 하여 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(), {
      wrapper,
    });

    const currentPage = result.current.page;

    waitFor(() => {
      result.current.fetchNextPage();

      expect(result.current.page).toEqual(currentPage + 5);
    });
  });

  test('현재 페이지가 7이고, 이전의 페이지를 불러올 때 현재 시작 페이지 - 5을 하여 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(7), {
      wrapper,
    });

    waitFor(() => {
      result.current.fetchPrevPage();

      expect(result.current.page).toEqual(0);
    });
  });

  test('현재 페이지가 12이고, 이전의 페이지를 불러올 때 현재 시작 페이지 - 5을 하여 불러온다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(7), {
      wrapper,
    });

    waitFor(() => {
      result.current.fetchPrevPage();

      expect(result.current.page).toEqual(5);
    });
  });

  test('현재 페이지가 13이라면, 시작 페이지는 10이다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(13), {
      wrapper,
    });

    waitFor(() => {
      expect(result.current.startPage).toEqual(10);
    });
  });

  test('현재 페이지가 15이라면, 시작 페이지는 15이다. 사용자를 다루는 컴포넌트에서 +1을 해서 보여주기 때문에 5 단위로 바뀝니다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(15), {
      wrapper,
    });

    waitFor(() => {
      expect(result.current.startPage).toEqual(15);
    });
  });

  test('총 페이지가 현재 페이지 +5를 한 값보다 크다면 다음 페이지 여부를 반환하는 변수가 true로 동작한다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(0), {
      wrapper,
    });

    const totalPage = 6;

    expect(result.current.isCheckNextPage(totalPage)).toBe(true);
  });

  test('총 페이지가 시작 페이지 +5를 한 값보다 같거나 작다면 다음 페이지 여부를 반환하는 변수가 false로 동작한다.', async () => {
    const { result } = renderHook(() => usePagedNoticeList(5), {
      wrapper,
    });

    const totalPage = 10;

    waitFor(() => {
      result.current.setPage(totalPage + 1);
    });

    expect(result.current.isCheckNextPage(totalPage)).toBe(false);
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
