import { SelectedState, getSelectedState } from '@utils/post/getSelectedState';

import { MOCK_CATEGORY_LIST } from '@mocks/mockData/categoryList';

describe('getSelectedState 사용했을 때 현재 유저에게 어떤 게시글에 대한 종류를 보고 있는지에 대한 정보를 반환한다.', () => {
  test('현재 카테고리가 선택되어 있고, 카테고리 아이디가 1번일 때 해당하는 카테고리 이름을 반환한다.', () => {
    const categoryId = 1;
    const state: SelectedState = {
      postType: 'category',
      categoryId,
      keyword: '',
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(categoryId).toBe(MOCK_CATEGORY_LIST[0].id);
    expect(result).toBe(MOCK_CATEGORY_LIST[0].name);
  });

  test('현재 검색을 한 상태이면, 검색 키워드를 반환한다.', () => {
    const keyword = '갤럭시';
    const state: SelectedState = {
      postType: 'search',
      categoryId: 0,
      keyword,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(result).toBe(keyword);
  });

  test('검색어를 길게 설정한 경우 10자만 보여주고 ...으로 표시해서 보여준다.', () => {
    const keyword = '아이폰갤럭시뉴진스아이브세븐틴슈퍼주니어임';
    const state: SelectedState = {
      postType: 'search',
      categoryId: 0,
      keyword,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(result).toBe('아이폰갤럭시뉴진스아...');
  });

  test('검색어를 10글자인 경우 10글자 전부 표시해서 보여준다.', () => {
    const keyword = '아이폰갤럭시뉴진스아';
    const state: SelectedState = {
      postType: 'search',
      categoryId: 0,
      keyword,
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(result).toBe('아이폰갤럭시뉴진스아');
  });

  test('현재 홈 화면에 있다면, "전체"를 반환한다', () => {
    const state: SelectedState = {
      postType: 'posts',
      categoryId: 0,
      keyword: '',
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(result).toBe('전체');
  });

  test('현재 내가 작성한 글 페이지에 있다면, "내가 작성한 글"을 반환한다.', () => {
    const state: SelectedState = {
      postType: 'myPost',
      categoryId: 0,
      keyword: '',
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(result).toBe('내가 작성한 글');
  });

  test('현재 내가 투표한 글 페이지에 있다면, "내가 투표한 글"을 반환한다.', () => {
    const state: SelectedState = {
      postType: 'myVote',
      categoryId: 0,
      keyword: '',
      categoryList: MOCK_CATEGORY_LIST,
    };

    const result = getSelectedState(state);

    expect(result).toBe('내가 투표한 글');
  });
});
