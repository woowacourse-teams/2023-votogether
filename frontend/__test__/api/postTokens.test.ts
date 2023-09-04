import { postTokens } from '@api/token';

import { MOCK_TOKEN } from '@mocks/mockData/token';

test('리프레시 토큰을 보내서 엑세스 토큰과 리프레시 토큰을 재발급 받는다.', async () => {
  const refreshToken = 'refresh!!!';

  const tokens = await postTokens(refreshToken);

  expect(tokens).toEqual(MOCK_TOKEN);
});
