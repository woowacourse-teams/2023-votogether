import { getCommentList, transformCommentListResponse } from '@api/comment';

import { MOCK_COMMENT_LIST } from '@mocks/mockData/comment';

describe('서버와 통신하여 댓글 목록을 불러오는지 확인한다.', () => {
  test('댓글 목록을 불러온다', async () => {
    const data = await getCommentList(1);

    expect(data).toEqual(transformCommentListResponse(MOCK_COMMENT_LIST));
  });

  test('댓글 목록을 프론트엔드에서 가공해서 사용한다. 오브젝트의 키 값으로는 [id, content, createdAt, member, isEdit] 이 존재한다.', async () => {
    const data = await getCommentList(1);

    const commentKeys = Object.keys(data[0]);

    expect(commentKeys).toEqual(['id', 'content', 'createdAt', 'member', 'isEdit']);
  });
});
