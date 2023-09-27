import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useSelect } from '@hooks';

import { PostStatus } from '@pages/HomePage/types';

const INIT_SELECTED_OPTION = 'progress';
const CHANGE_SELECTED_OPTION = 'closed';

describe('useSelect 훅이 전체 게시글 목록을 불러오는지 확인한다', () => {
  test('초기 값이 설정 되었는지 확인한다.', () => {
    const { result } = renderHook(() => useSelect<PostStatus>(INIT_SELECTED_OPTION));

    const { selectedOption } = result.current;

    expect(selectedOption).toBe(INIT_SELECTED_OPTION);
  });

  test('값을 바꾸는 함수가 값을 바꿨는지 확인한다.', () => {
    const INIT_SELECTED_OPTION = 'progress';

    const { result } = renderHook(() => useSelect<PostStatus>(INIT_SELECTED_OPTION));

    const { handleOptionChange } = result.current;

    act(() => {
      handleOptionChange(CHANGE_SELECTED_OPTION);
    });

    const { selectedOption } = result.current;

    expect(selectedOption).toBe(CHANGE_SELECTED_OPTION);
  });
});
