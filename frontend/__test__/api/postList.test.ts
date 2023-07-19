import { getPostList } from '@api/wus/postList';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

describe('전체 게시글 목록을 패치하는 로직이 의도한대로 작동하는 지 확인한다.', () => {
  test('게시글 목록의 개수는 10개씩 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'all', postSorting: 'popular', pages: 0 });

    expect(data.length).toBe(10);
  });

  test('게시글 목록을 모든 게시글을 인기순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'all', postSorting: 'popular', pages: 0 });

    expect(data).toEqual(MOCK_POST_LIST[0]);
  });

  test('게시글 목록을 모든 게시글, 최신순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'all', postSorting: 'latest', pages: 0 });

    expect(data).toEqual(MOCK_POST_LIST[0]);
  });

  test('게시글 목록을 투표 진행 중인 게시글, 인기순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'progress', postSorting: 'popular', pages: 0 });

    expect(data).toEqual(MOCK_POST_LIST[0]);
  });

  test('게시글 목록을 투표 진행 중인 게시글, 최신순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'progress', postSorting: 'latest', pages: 0 });

    expect(data).toEqual(MOCK_POST_LIST[0]);
  });

  test('게시글 목록을 투표 마감한 게시글, 인기순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'closed', postSorting: 'popular', pages: 0 });

    expect(data).toEqual(MOCK_POST_LIST[0]);
  });

  test('게시글 목록을 투표 마감한 게시글, 최신순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'closed', postSorting: 'latest', pages: 0 });

    expect(data).toEqual(MOCK_POST_LIST[0]);
  });
  test('게시글 목록의 1페이지를 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'closed', postSorting: 'latest', pages: 1 });

    expect(data).toEqual(MOCK_POST_LIST[1]);
  });
});
