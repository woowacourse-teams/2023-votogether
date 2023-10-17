import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useBannerNotice } from '@hooks';

import { MOCK_TRANSFORM_NOTICE } from '@mocks/mockData/notice';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('배너 공지사항을 불러오는지 확인한다.', () => {
  test('배너 공지사항을 확인한다', async () => {
    const { result } = renderHook(() => useBannerNotice(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(MOCK_TRANSFORM_NOTICE));
  });
});
