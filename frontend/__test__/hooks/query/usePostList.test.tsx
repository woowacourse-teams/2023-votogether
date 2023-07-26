import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { usePostList } from '@hooks/query/usePostList';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePostList 훅이 게시글 목록을 불러오는지 확인한다.', () => {
  test('전체 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () => usePostList({ postSorting: 'popular', postStatus: 'all' }),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.data?.pages[0].postList).toEqual(MOCK_POST_LIST[0]));
  });

  test('카테고리별 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () => usePostList({ postSorting: 'popular', postStatus: 'all', categoryId: 1 }),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.data?.pages[0].postList).toEqual(MOCK_POST_LIST[0]));
  });
});
