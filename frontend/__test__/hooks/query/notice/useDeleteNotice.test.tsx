import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useNoticeDelete } from '@hooks';

import { MOCK_NOTICE_TEST } from '@mocks/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useNoticeDelete 훅이 공지 사항을 삭제하는 지 확인한다.', () => {
  test('공지 사항을 삭제한다.', async () => {
    const { result } = renderHook(() => useNoticeDelete(), {
      wrapper,
    });

    const { mutate } = result.current;

    await waitFor(() => {
      mutate(1);

      expect(MOCK_NOTICE_TEST).toBe('삭제된 공지사항');
    });
  });
});
