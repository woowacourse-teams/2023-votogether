import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { fireEvent, render, renderHook, screen } from '@testing-library/react';

import { useSearch } from '@hooks';

describe('useSearch 훅이 검색을 하는지 확인한다.', () => {
  test('초기 값이 없다면 keyword는 빈 문자열이다.', () => {
    const { result } = renderHook(() => useSearch(), { wrapper: MemoryRouter });

    const { keyword } = result.current;

    expect(keyword).toBe('');
  });

  test('초기 값이 있다면 keyword 값에 설정된다.', () => {
    const KEYWORD = '갤럭시';

    const { result } = renderHook(() => useSearch(KEYWORD), { wrapper: MemoryRouter });

    const { keyword } = result.current;

    expect(keyword).toBe(KEYWORD);
  });

  test('onChange 이벤트를 한다면 keyword 값에 설정된다.', () => {
    const KEYWORD = '갤럭시';

    const { result } = renderHook(() => useSearch(KEYWORD), { wrapper: MemoryRouter });
    const { keyword, handleKeywordChange } = result.current;

    render(<input value={keyword} aria-label="search-input" onChange={handleKeywordChange} />);

    const input = screen.getByLabelText('search-input');

    fireEvent.change(input, { target: { value: KEYWORD } });

    expect(result.current.keyword).toBe(KEYWORD);
  });
});
