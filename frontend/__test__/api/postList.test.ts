import { getPostList } from '@api/postList';

import { POST_TYPE, SORTING, STATUS } from '@constants/post';

import { MOCK_TRANSFORM_POST_LIST } from '@mocks/mockData/postList';

describe('서버와 통신하여 전체 게시글 목록을 불러오는지 확인한다.', () => {
  test('게시글 목록의 개수는 10개씩 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.ALL,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.ALL,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList.length).toBe(10);
  });

  test('게시글 목록을 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.ALL,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 3,
        postType: POST_TYPE.ALL,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.pageNumber).toEqual(3);
  });

  test('카테고리별 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.CATEGORY,
      },
      {
        categoryId: 1,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('내가 작성한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.MY_POST,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('내가 투표한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.MY_VOTE,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('내가 검색한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.SEARCH,
      },
      {
        categoryId: 0,
        keyword: '갤럭시',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });
});
