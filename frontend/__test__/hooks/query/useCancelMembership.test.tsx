import React, { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { useWithdrawalMembership } from '@hooks/query/user/useWithdrawalMembership';

import { MOCK_USER_INFO } from '@mocks/mockData/user';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useWithdrawalMembership 훅이 회원 탈퇴를 하는지 확인한다', () => {
  test('유저가 회원 탈퇴를 한다', async () => {
    const { result } = renderHook(() => useWithdrawalMembership(), {
      wrapper,
    });

    const { mutate } = result.current;

    await waitFor(async () => {
      mutate();

      expect(MOCK_USER_INFO.nickname).toBe('cancel');
    });
  });
});
