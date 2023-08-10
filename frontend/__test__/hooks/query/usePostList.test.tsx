import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { usePostList } from '@hooks/query/usePostList';

import { POST_TYPE, SORTING, STATUS } from '@constants/post';

import { MOCK_TRANSFORM_POST_LIST } from '@mocks/mockData/post';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePostList 훅이 게시글 목록을 불러오는지 확인한다.', () => {
  test('전체 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.ALL,
          },
          {
            categoryId: 0,
            keyword: '',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0].postList).toEqual(MOCK_TRANSFORM_POST_LIST)
    );
  });

  test('카테고리별 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.CATEGORY,
          },
          {
            categoryId: 1,
            keyword: '',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0].postList).toEqual(MOCK_TRANSFORM_POST_LIST)
    );
  });

  test('내가 작성한 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.MY_POST,
          },
          {
            categoryId: 0,
            keyword: '',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0].postList).toEqual(MOCK_TRANSFORM_POST_LIST)
    );
  });

  test('내가 투표한 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.MY_VOTE,
          },
          {
            categoryId: 0,
            keyword: '',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0].postList).toEqual(MOCK_TRANSFORM_POST_LIST)
    );
  });

  test('내가 검색한 게시글 목록을 불러온다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.SEARCH,
          },
          {
            categoryId: 0,
            keyword: '갤럭시',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0].postList).toEqual(MOCK_TRANSFORM_POST_LIST)
    );
  });

  test('게시글 목록이 존재할 경우 isPostListEmpty는 false를 반환한다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.SEARCH,
          },
          {
            categoryId: 0,
            keyword: '갤럭시',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.data?.pages[0].postList.length).toBe(10));
    await waitFor(() => expect(result.current.isPostListEmpty).toBe(false));
  });

  test('게시글 목록이 존재하지 않을 경우 isPostListEmpty는 true를 반환한다.', async () => {
    const { result } = renderHook(
      () =>
        usePostList(
          {
            postSorting: SORTING.POPULAR,
            postStatus: STATUS.ALL,
            postType: POST_TYPE.SEARCH,
          },
          {
            categoryId: 0,
            keyword: '999',
          }
        ),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.data?.pages[0].postList.length).toBe(0));
    await waitFor(() => expect(result.current.isPostListEmpty).toBe(true));
  });
});
