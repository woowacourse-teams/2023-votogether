import { getPostList } from '@api/wus/postList';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

describe('전체 게시글 목록을 패치하는 로직이 의도한대로 작동하는 지 확인한다.', () => {
  test('게시글 목록을 모든 게시글을 인기순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'all', postSorting: 'popular' });

    expect(data).toEqual(MOCK_POST_LIST);
  });

  test('게시글 목록을 모든 게시글, 최신순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'all', postSorting: 'latest' });

    expect(data).toEqual(MOCK_POST_LIST);
  });

  test('게시글 목록을 투표 진행 중인 게시글, 인기순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'progress', postSorting: 'popular' });

    expect(data).toEqual(MOCK_POST_LIST);
  });

  test('게시글 목록을 투표 진행 중인 게시글, 최신순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'progress', postSorting: 'latest' });

    expect(data).toEqual(MOCK_POST_LIST);
  });

  test('게시글 목록을 투표 마감한 게시글, 인기순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'closed', postSorting: 'popular' });

    expect(data).toEqual(MOCK_POST_LIST);
  });

  test('게시글 목록을 투표 마감한 게시글, 최신순으로 불러온다.', async () => {
    const data = await getPostList({ postStatus: 'closed', postSorting: 'latest' });

    expect(data).toEqual(MOCK_POST_LIST);
  });
});
