import { useState } from 'react';

/**
 *
 * @param initialPageNumber 시작 페이지 번호 default: 0
 * @param size 페이지를 몇개씩 보여줄 것인지의 단위 default: 5
 * @returns
 */
export const usePagination = (initialPageNumber: number = 0, size: number = 5) => {
  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const getPageNumberList = (totalPage: number) =>
    Array.from(
      { length: Math.min(totalPage - startNumber, size) },
      (__, index) => startNumber + (index % size) + 1
    );

  const startNumber = Math.floor(pageNumber / size) * size;

  const hasPrevPage = startNumber > 0;

  const setPage = (value: number) => {
    setPageNumber(value - 1);
  };

  const checkNextPage = (totalPage: number) => {
    return totalPage > startNumber + size;
  };

  const fetchPrevPage = () => {
    if (startNumber === 0) return;

    setPageNumber(startNumber - size);
  };

  const fetchNextPage = (totalPage: number) => {
    if (!checkNextPage(totalPage)) return;

    setPageNumber(startNumber + size);
  };

  return {
    page: pageNumber,
    setPage,
    getPageNumberList,
    hasPrevPage,
    startNumber,
    fetchNextPage,
    fetchPrevPage,
    checkNextPage: checkNextPage,
  };
};
