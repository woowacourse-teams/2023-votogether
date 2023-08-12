import { votePost } from '@api/post';

import { MOCK_POST_INFO } from '@mocks/mockData/post';

describe('서버와 통신하여 유저의 정보를 불러올 수 있어야 한다.', () => {
  test('유저의 정보를 불러온다', async () => {
    const postId = 1;
    const optionId = 2;

    await votePost(postId, optionId);

    expect(MOCK_POST_INFO.voteInfo.selectedOptionId).toBe(999);
  });
});
