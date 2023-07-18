import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { usePostList } from '@hooks/query/usePostList';

import { MOCK_POST_LIST } from '../../src/mocks/wus/post';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePostList 훅이 의도한대로 작동하는 지 확인한다.', () => {
  test('usePostList에서 패칭된 값을 확인한다.', async () => {
    const { result } = renderHook(() => usePostList(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data).toEqual(MOCK_POST_LIST));
  });
});
