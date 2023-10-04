import {
  SelectedPostListState,
  getSelectedPostListState,
} from '@utils/post/getSelectedPostListState';

import { MOCK_CATEGORY_LIST } from '@mocks/mockData/categoryList';

describe('getSelectedState 사용했을 때 현재 유저에게 어떤 게시글에 대한 종류를 보고 있는지에 대한 정보를 반환한다.', () => {
  test('현재 카테고리가 선택되어 있고, 카테고리 아이디가 1번일 때 해당하는 카테고리 이름을 반환한다.', () => {
    const categoryId = 1;
    const state: SelectedPostListState = {
      postType: 'category',
      categoryId,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedPostListState(state);

    expect(categoryId).toBe(MOCK_CATEGORY_LIST[0].id);
    expect(result).toBe(MOCK_CATEGORY_LIST[0].name);
  });

  test('현재 홈 화면에 있다면, "전체"를 반환한다', () => {
    const state: SelectedPostListState = {
      postType: 'posts',
      categoryId: 0,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedPostListState(state);

    expect(result).toBe('전체');
  });

  test('현재 내가 작성한 글 페이지에 있다면, "내가 작성한 글"을 반환한다.', () => {
    const state: SelectedPostListState = {
      postType: 'myPost',
      categoryId: 0,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedPostListState(state);

    expect(result).toBe('내가 작성한 글');
  });

  test('현재 내가 투표한 글 페이지에 있다면, "내가 투표한 글"을 반환한다.', () => {
    const state: SelectedPostListState = {
      postType: 'myVote',
      categoryId: 0,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedPostListState(state);

    expect(result).toBe('내가 투표한 글');
  });
});
