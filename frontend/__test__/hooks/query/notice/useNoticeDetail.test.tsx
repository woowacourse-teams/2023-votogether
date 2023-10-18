import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useNoticeDetail } from '@hooks';

import { MOCK_TRANSFORM_NOTICE } from '@mocks/mockData/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('공지 사항 상세 정보를 불러오는 지 확인한다.', () => {
  test('공지 사항 상세 정보를 불러온다.', async () => {
    const { result } = renderHook(() => useNoticeDetail(1), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(MOCK_TRANSFORM_NOTICE);
    });
  });
});
