import { renderHook, act } from '@testing-library/react';

import { useCount } from '../src/hooks/useCount';

test('useCount hook을 테스트한다.', () => {
  const { result } = renderHook(() => useCount());

  act(() => {
    result.current.increase();
  });

  expect(result.current.count).toBe(1);
});
