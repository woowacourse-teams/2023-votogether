import { MOCK_CATEGORY_LIST } from '@mocks/mockData/categoryList';

const MEMBER = true;
const GUEST = false;

describe('카테고리에 대한 통신이 의도한대로 작동하는 지 확인한다.', () => {
  test('회원의 카테고리 정보를 불러올 수 있다.', async () => {
    const data = await getUserCategoryList(MEMBER);

    expect(data).toBe(MOCK_CATEGORY_LIST);
  });

  test('비회원의 카테고리 정보를 불러올 수 있다.', async () => {
    const data = await getUserCategoryList(GUEST);

    expect(data.postList).toEqual(MOCK_GUEST_CATEGORY_LIST);
  });

  test('회원이 카테고리 즐겨찾기를 할 수 있다.', () => {
    MOCK_CATEGORY_LIST[1].isFavorite = false;

    await addFavoriteCategory(MOCK_CATEGORY_LIST[1].id);

    const data = await getUserCategoryList(MEMBER);

    expect(MOCK_CATEGORY_LIST[1].isFavorite).toBe(true);
  });

  test('회원이 카테고리 즐겨찾기를 해제할 수 있다.', async () => {
    MOCK_CATEGORY_LIST[0].isFavorite = true;

    await removeFavoriteCategory(MOCK_CATEGORY_LIST[0].id);

    const data = await getUserCategoryList(MEMBER);

    expect(MOCK_CATEGORY_LIST[0].isFavorite).toBe(false);
  });

  test('클라이언트에서 사용하는 API 명세가 의도한대로 존재해야한다.', async () => {
    const data = await getGuestCategoryList(GUEST);

    const dataKeys = Object.keys(data);

    expect(dataKeys).toEqual(['id', 'name', 'isFavorite']);
  });
});
