import { getPostList } from '@api/wus/postList';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

describe('전체 게시글 목록을 패치하는 로직이 의도한대로 작동하는 지 확인한다.', () => {
  test('게시글 목록을 불러온다.', async () => {
    const data = await getPostList();

    expect(data).toEqual(MOCK_POST_LIST);
  });
});
