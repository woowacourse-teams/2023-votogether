import { renderHook } from '@testing-library/react';

import { usePostList } from '../../src/hooks/query/usePostList';
import { MOCK_POST_LIST } from '../../src/mocks/wus/post';

describe('usePostList 훅이 의도한대로 작동하는 지 확인한다.', () => {
  test('usePostList에서 패칭된 값을 확인한다.', () => {
    const { result } = renderHook(() => usePostList());

    const { data } = result.current;

    expect(data).toEqual(MOCK_POST_LIST);
  });
});
