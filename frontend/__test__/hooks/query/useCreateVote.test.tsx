import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useCreateVote } from '@hooks';

import { MOCK_POST_INFO } from '@mocks/mockData/post';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCreateVote 훅이 선택지를 생성하는 지 확인한다.', () => {
  test('선택지를 변경한다.', async () => {
    const { result } = renderHook(() => useCreateVote({ isPreview: false, postId: 1 }), {
      wrapper,
    });

    const { mutate } = result.current;

    await waitFor(() => {
      mutate(1);

      expect(MOCK_POST_INFO.voteInfo.selectedOptionId).toBe(999);
    });
  });
});
