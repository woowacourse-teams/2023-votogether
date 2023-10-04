import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useCategoryList } from '@hooks';

import { transformCategoryListResponse } from '@api/categoryList';

import { MOCK_CATEGORY_LIST, MOCK_GUEST_CATEGORY_LIST } from '@mocks/mockData/categoryList';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCategoryList 훅이 카테고리 목록을 불러오는지 확인한다.', () => {
  test('비회원 카테고리 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useCategoryList(false), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.data).toEqual(transformCategoryListResponse(MOCK_GUEST_CATEGORY_LIST))
    );
  });

  test('회원 카테고리 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useCategoryList(true), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.data).toEqual(transformCategoryListResponse(MOCK_CATEGORY_LIST))
    );
  });

  test('회원 카테고리 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useCategoryList(true), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.data).toEqual(transformCategoryListResponse(MOCK_CATEGORY_LIST))
    );
  });
});
