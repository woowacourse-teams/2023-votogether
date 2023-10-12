import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useNoticeList } from '@hooks';

import { MOCK_TRANSFORM_NOTICE_LIST } from '@mocks/mockData/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useNoticeList 훅이 공지 사항 리스트를 불러오는 지 확인한다.', () => {
  test('공지 사항 목록 0 페이지를 불러온다.', async () => {
    const { result } = renderHook(() => useNoticeList(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_TRANSFORM_NOTICE_LIST);
    });
  });
});
