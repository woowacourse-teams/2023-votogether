import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useMoreComment } from '@hooks';

import { MOCK_TRANSFORMED_COMMENT_LIST } from '@mocks/mockData/comment';

describe(`useMoreComment 훅에서 댓글 리스트를 입력받고, 10개 단위로 자른 댓글 리스트를 반환한다. 
더보기를 했을 때 10개 단위로 추가된다. 더 이상 보여줄 댓글이 없다면 더 이상 데이터를 자를 수 없다고 boolean 변수를 반환한다.`, () => {
  test('테스트에 사용되는 댓글 리스트의 개수는 20개 이상이다', () => {
    expect(MOCK_TRANSFORMED_COMMENT_LIST.length).toBeGreaterThan(20);
  });

  test('댓글 리스트를 입력받고, 10개 단위로 보여준다. ', () => {
    const { result } = renderHook(() => useMoreComment(MOCK_TRANSFORMED_COMMENT_LIST));

    const { slicedCommentList } = result.current;

    expect(slicedCommentList).toEqual(MOCK_TRANSFORMED_COMMENT_LIST.slice(0, 10));
  });

  test('더보기를 했을 때 10개 단위로 댓글 리스트에 추가된다.', () => {
    const { result } = renderHook(() => useMoreComment(MOCK_TRANSFORMED_COMMENT_LIST));

    const { handleMoreComment } = result.current;

    act(() => {
      handleMoreComment();
    });

    const { slicedCommentList } = result.current;

    expect(slicedCommentList).toEqual(MOCK_TRANSFORMED_COMMENT_LIST.slice(0, 20));
  });

  test('10개 초과의 댓글 리스트가 있을 때 hasMoreComment를 true로 반환한다.', () => {
    const { result } = renderHook(() => useMoreComment(MOCK_TRANSFORMED_COMMENT_LIST));

    const { hasMoreComment } = result.current;

    expect(hasMoreComment).toBe(true);
  });

  test('10개의 댓글 리스트가 있을 때 hasMoreComment를 false로 반환한다.', () => {
    const TEN_LENGTH_COMMENT_LIST = MOCK_TRANSFORMED_COMMENT_LIST.slice(0, 10);

    const { result } = renderHook(() => useMoreComment(TEN_LENGTH_COMMENT_LIST));

    const { hasMoreComment } = result.current;

    expect(hasMoreComment).toBe(false);
  });

  test('15개의 댓글 리스트가 있을 때 더보기를 하고 나면 hasMoreComment를 false로 반환한다.', () => {
    const FIFTEEN_LENGTH_COMMENT_LIST = MOCK_TRANSFORMED_COMMENT_LIST.slice(0, 15);

    const { result } = renderHook(() => useMoreComment(FIFTEEN_LENGTH_COMMENT_LIST));

    const { handleMoreComment } = result.current;

    act(() => {
      handleMoreComment();
    });

    const { hasMoreComment } = result.current;

    expect(hasMoreComment).toBe(false);
  });
});
