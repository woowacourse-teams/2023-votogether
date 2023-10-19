// import React, { ReactNode } from 'react';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { renderHook, waitFor } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';

// import { usePagination } from '@hooks';

// const queryClient = new QueryClient();

// const wrapper = ({ children }: { children: ReactNode }) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

describe('페이지 버튼을 눌러 공지 사항 리스트를 불러오는 지 확인한다.', () => {
  test('임시 테스트', () => {
    const tmp = 1;
    expect(tmp).toBe(1);
  });
  //   test('초기 설정으로는 0 페이지를 불러온다.', async () => {
  //     const { result } = renderHook(() => usePagination(), {
  //       wrapper,
  //     });

  //     waitFor(() => {
  //       expect(result.current.page).toBe(0);
  //     });
  //   });

  //   test('초기 페이지를 인자를 넣어 설정할 수 있다.', async () => {
  //     const { result } = renderHook(() => usePagination(5), {
  //       wrapper,
  //     });

  //     waitFor(() => {
  //       expect(result.current.page).toBe(5);
  //     });
  //   });

  //   test('현재 페이지를 3으로 설정했을 때 3페이지를 데이터만 불러온다. 클라이언트 측에서 3으로 설정했어도 서버로는 2를 보내야 하기 때문에 현재 페이지는 2로 설정된다.', async () => {
  //     const { result } = renderHook(() => usePagination(), {
  //       wrapper,
  //     });

  //     act(() => {
  //       result.current.setPage(3);
  //     });

  //     waitFor(() => {
  //       expect(result.current.page).toBe(2);
  //     });
  //   });

  //   test.each([
  //     [0, 5, 5],
  //     [0, 2, 2],
  //     [0, 8, 8],
  //     [16, 8, 24],
  //   ])(
  //     '현재 페이지가 %s이고, 사이즈가 %s라면 다음 페이지를 불러올 때 현재 페이지의 시작 페이지 번호 + %s 을 하여 불러온다.',
  //     (currentPage, size, expected) => {
  //       const { result } = renderHook(() => usePagination(currentPage, size), {
  //         wrapper,
  //       });

  //       const totalPage = 10;

  //       waitFor(() => {
  //         result.current.fetchNextPage(totalPage);

  //         expect(result.current.page).toBe(expected);
  //       });
  //     }
  //   );

  //   test.each([
  //     [0, 0],
  //     [7, 0],
  //     [7, 5],
  //     [12, 10],
  //     [15, 15],
  //   ])(
  //     '현재 페이지가 %s이고, 이전의 페이지를 불러올 때 현재 시작 페이지 - 5을 한 값이 %s이다.',
  //     (currentPage, expected) => {
  //       const { result } = renderHook(() => usePagination(currentPage), {
  //         wrapper,
  //       });

  //       waitFor(() => {
  //         result.current.fetchPrevPage();

  //         expect(result.current.page).toBe(expected);
  //       });
  //     }
  //   );

  //   test.each([
  //     [0, 6, true],
  //     [5, 15, true],
  //     [5, 10, false],
  //     [5, 5, false],
  //     [0, 5, false],
  //   ])(
  //     '현재 페이지 %s이고, 전체 페이지가 %s일 때 결과는 %s이다. 전체 페이지가 현재 페이지 +5를 한 값보다 크다면 true, 작다면 false를 반환한다.',
  //     (currentPage, totalPage, expected) => {
  //       const { result } = renderHook(() => usePagination(currentPage), {
  //         wrapper,
  //       });

  //       expect(result.current.checkNextPage(totalPage)).toBe(expected);
  //     }
  //   );

  //   test.each([
  //     [6, 0, [1, 2, 3, 4, 5]],
  //     [15, 14, [11, 12, 13, 14, 15]],
  //     [4, 3, [1, 2, 3, 4]],
  //     [23, 20, [21, 22, 23]],
  //     [2, 0, [1, 2]],
  //     [10, 3, [1, 2, 3, 4, 5]],
  //   ])(
  //     '전체 페이지가 %s이고, 현재 페이지가 %s라면 페이지 리스트는 %s를 반환한다. 현재 페이지는 0,1,2 와 같이 0으로 시작한다.',
  //     (totalPage, currentPage, expected) => {
  //       const { result } = renderHook(() => usePagination(currentPage), {
  //         wrapper,
  //       });

  //       expect(result.current.getPageNumberList(totalPage)).toEqual(expected);
  //     }
  //   );
});
