import { getPostList } from '@api/post';

import { POST_TYPE } from '@constants/api';
import { SORTING, STATUS } from '@constants/post';

import { MOCK_TRANSFORM_GUEST_POST_LIST, MOCK_TRANSFORM_POST_LIST } from '@mocks/mockData/post';

describe('서버와 통신하여 전체 게시글 목록을 불러오는지 확인한다.', () => {
  test('게시글 목록의 개수는 10개씩 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.ALL,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.ALL,
        isLoggedIn: false,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList.length).toBe(10);
  });

  test('(회원)게시글 목록을 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.ALL,
        isLoggedIn: true,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('(비회원)전체 게시글 목록을 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.SEARCH,
        isLoggedIn: false,
      },
      {
        categoryId: 0,
        keyword: '갤럭시',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_GUEST_POST_LIST);
  });

  test('게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 3,
        postType: POST_TYPE.ALL,
        isLoggedIn: false,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.pageNumber).toEqual(3);
  });

  test('(회원)카테고리별 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.CATEGORY,
        isLoggedIn: true,
      },
      {
        categoryId: 1,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('(비회원)카테고리별 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.CATEGORY,
        isLoggedIn: false,
      },
      {
        categoryId: 1,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_GUEST_POST_LIST);
  });

  test('(회원만 가능)내가 작성한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.MY_POST,
        isLoggedIn: true,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('(회원만 가능)내가 투표한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.MY_VOTE,
        isLoggedIn: true,
      },
      {
        categoryId: 0,
        keyword: '',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('(회원)내가 검색한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.SEARCH,
        isLoggedIn: true,
      },
      {
        categoryId: 0,
        keyword: '갤럭시',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_POST_LIST);
  });

  test('(비회원)내가 검색한 게시글 페이지의 정보를 불러온다.', async () => {
    const data = await getPostList(
      {
        postStatus: STATUS.CLOSED,
        postSorting: SORTING.POPULAR,
        pageNumber: 0,
        postType: POST_TYPE.SEARCH,
        isLoggedIn: false,
      },
      {
        categoryId: 0,
        keyword: '갤럭시',
      }
    );

    expect(data.postList).toEqual(MOCK_TRANSFORM_GUEST_POST_LIST);
  });
});
