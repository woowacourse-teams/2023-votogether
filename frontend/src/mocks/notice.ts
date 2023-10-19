import { rest } from 'msw';

import { MOCK_NOTICE_LIST_RESPONSE, MOCK_NOTICE_RESPONSE } from './mockData/notice';

export let MOCK_NOTICE_TEST = '';

export const mockNotice = [
  rest.post(`/notices`, async (req, res, ctx) => {
    const data = await req.json();

    MOCK_NOTICE_TEST = data.title;

    return res(ctx.status(200));
  }),

  rest.get('/notices/progress', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_NOTICE_RESPONSE));
  }),

  rest.get(`/notices`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_NOTICE_LIST_RESPONSE));
  }),

  rest.get(`/notices/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_NOTICE_RESPONSE));
  }),

  rest.put(`/notices/:id`, async (req, res, ctx) => {
    const data = await req.json();

    MOCK_NOTICE_TEST = data.title;

    return res(ctx.status(200));
  }),

  rest.delete(`/notices/:id`, (req, res, ctx) => {
    MOCK_NOTICE_TEST = '삭제된 공지사항';

    return res(ctx.status(204));
  }),
];
