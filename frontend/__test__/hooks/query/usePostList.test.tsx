import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { usePostList } from '@hooks/query/usePostList';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePostList 훅이 의도한대로 작동하는 지 확인한다.', () => {
  test('게시글 목록을 모든 게시글을 인기순으로 불러온다.', async () => {
    const { result } = renderHook(
      () => usePostList({ postSorting: 'popular', postStatus: 'all' }),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.data).toEqual(MOCK_POST_LIST));
  });
});
