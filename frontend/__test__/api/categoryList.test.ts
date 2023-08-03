import {
  addFavoriteCategory,
  getGuestCategoryList,
  getUserCategoryList,
  removeFavoriteCategory,
  transformCategoryListResponse,
} from '@api/categoryList';

import { MOCK_CATEGORY_LIST, MOCK_GUEST_CATEGORY_LIST } from '@mocks/mockData/categoryList';

describe('카테고리에 대한 통신(카테고리 목록 조회, 즐겨찾기 추가, 제거)이 올바르게 작동하는 지 확인한다.', () => {
  test('회원의 카테고리 정보를 불러올 수 있다.', async () => {
    const data = await getUserCategoryList();

    const expectResult = transformCategoryListResponse(MOCK_CATEGORY_LIST);

    expect(data).toEqual(expectResult);
  });

  test('비회원의 카테고리 정보를 불러올 수 있다.', async () => {
    const data = await getGuestCategoryList();

    const expectResult = transformCategoryListResponse(MOCK_GUEST_CATEGORY_LIST);

    expect(data).toEqual(expectResult);
  });

  test('회원이 카테고리 즐겨찾기를 할 수 있다.', async () => {
    MOCK_CATEGORY_LIST[1].isFavorite = false;

    await addFavoriteCategory(MOCK_CATEGORY_LIST[1].id);

    const data = await getUserCategoryList();

    expect(data[1].isFavorite).toBe(true);
  });

  test('회원이 카테고리 즐겨찾기를 해제할 수 있다.', async () => {
    MOCK_CATEGORY_LIST[0].isFavorite = true;

    await removeFavoriteCategory(MOCK_CATEGORY_LIST[0].id);

    const data = await getUserCategoryList();

    expect(data[0].isFavorite).toBe(false);
  });

  test('클라이언트에서 사용하는 API 명세가 [id, name, isFavorite]으로 존재해야한다.', async () => {
    const data = await getGuestCategoryList();

    const categoryKeys = Object.keys(data[0]);

    expect(categoryKeys).toEqual(['id', 'name', 'isFavorite']);
  });
});
