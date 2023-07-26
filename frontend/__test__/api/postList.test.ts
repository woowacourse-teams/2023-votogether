import { getPostList } from '@api/postList';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

describe('서버와 통신하여 전체 게시글 목록을 불러오는지 확인한다.', () => {
  test('게시글 목록의 개수는 10개씩 불러온다.', async () => {
    const data = await getPostList({
      postStatus: 'all',
      postSorting: 'popular',
      pageNumber: 0,
      requestKind: 'all',
    });

    expect(data.postList.length).toBe(10);
  });

  test('게시글 목록을 불러온다.', async () => {
    const data = await getPostList({
      postStatus: 'closed',
      postSorting: 'popular',
      pageNumber: 0,
      requestKind: 'all',
    });

    expect(data.postList).toEqual(MOCK_POST_LIST);
  });

  test('게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList({
      postStatus: 'closed',
      postSorting: 'popular',
      pageNumber: 3,
      requestKind: 'all',
    });

    expect(data.pageNumber).toEqual(3);
  });

  test('카테고리별 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList({
      postStatus: 'closed',
      postSorting: 'popular',
      pageNumber: 3,
      categoryId: 1,
      requestKind: 'category',
    });

    expect(data.postList).toEqual(MOCK_POST_LIST);
  });

  test('내가 작성한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList({
      postStatus: 'closed',
      postSorting: 'popular',
      pageNumber: 3,
      categoryId: 1,
      requestKind: 'category',
    });

    expect(data.postList).toEqual(MOCK_POST_LIST);
  });

  test('내가 투표한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList({
      postStatus: 'closed',
      postSorting: 'popular',
      pageNumber: 3,
      categoryId: 1,
      requestKind: 'myVote',
    });

    expect(data.postList).toEqual(MOCK_POST_LIST);
  });
});
