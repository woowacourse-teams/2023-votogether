import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { useSelect } from '@hooks/useSelect';

import { PostStatusType } from '@components/post/PostListPage/constants/option';

const INIT_SELECTED_OPTION = 'progress';
const CHANGE_SELECTED_OPTION = 'closed';

describe('useSelect 훅이 의도한대로 동작하는지 테스트한다.', () => {
  test('초기 값이 의도한대로 설정 되었는지 확인한다.', () => {
    const { result } = renderHook(() => useSelect<PostStatusType>(INIT_SELECTED_OPTION));

    const { selectedOption } = result.current;

    expect(selectedOption).toBe(INIT_SELECTED_OPTION);
  });

  test('값을 바꾸는 함수가 값을 바꿨는지 확인한다.', () => {
    const INIT_SELECTED_OPTION = 'progress';

    const { result } = renderHook(() => useSelect<PostStatusType>(INIT_SELECTED_OPTION));

    const { handleOptionChange } = result.current;

    act(() => {
      handleOptionChange(CHANGE_SELECTED_OPTION);
    });

    const { selectedOption } = result.current;

    expect(selectedOption).toBe(CHANGE_SELECTED_OPTION);
  });
});
