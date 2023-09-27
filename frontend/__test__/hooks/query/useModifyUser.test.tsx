import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useModifyUser } from '@hooks';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useModifyUser 훅이 닉네임을 변경하는 지 확인한다', () => {
  test('유저가 닉네임을 변경한다', async () => {
    const { result } = renderHook(() => useModifyUser(), {
      wrapper,
    });

    const { mutate } = result.current;

    await waitFor(async () => {
      mutate('wood');

      expect(MOCK_USER_INFO.nickname).toBe('wood');
    });
  });
});
