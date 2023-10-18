import { rest } from 'msw';

import { MOCK_ADMIN_USER_INFO, MOCK_USER_INFO } from '@mocks/mockData/user';

export const mockUserInfo = [
  rest.get('/members/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_ADMIN_USER_INFO));
  }),

  rest.patch('/members/me/detail', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ok: '개인 정보가 성공적으로 저장되었습니다!' }));
  }),

  rest.patch('/members/me/nickname', (req, res, ctx) => {
    MOCK_USER_INFO.nickname = 'wood';

    return res(ctx.status(200), ctx.json({ ok: '닉네임이 성공적으로 수정되었습니다!' }));
  }),

  rest.delete('/members/me/delete', (req, res, ctx) => {
    MOCK_USER_INFO.nickname = 'cancel';

    return res(ctx.status(204));
  }),

  rest.delete('/auth/logout', (req, res, ctx) => {
    const expirationTime = new Date(Date.now() - 1);

    return res(
      ctx.status(204),
      ctx.cookie('hasEssentialInfo', 'expired', {
        expires: expirationTime,
      })
    );
  }),
];
