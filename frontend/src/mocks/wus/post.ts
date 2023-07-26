import { rest } from 'msw';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

export const mockPostList = [
  rest.get('/posts', (req, res, ctx) => {
    const pages = Number(req.url.searchParams.get('pages'));

    if (pages === null) return;

    if (pages > 0) {
      return res(ctx.status(200), ctx.json(MOCK_POST_LIST), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
  }),

  rest.get('/posts/categories/:categoryId', (req, res, ctx) => {
    const pages = Number(req.url.searchParams.get('pages'));

    if (pages === null) return;

    if (pages > 0) {
      return res(ctx.status(200), ctx.json(MOCK_POST_LIST), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
  }),

  rest.get('/members/me/', (req, res, ctx) => {
    const pages = Number(req.url.searchParams.get('pages'));

    if (pages === null) return;

    if (pages > 0) {
      return res(ctx.status(200), ctx.json(MOCK_POST_LIST), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
  }),

  rest.get('/posts/me/:categoryId', (req, res, ctx) => {
    const pages = Number(req.url.searchParams.get('pages'));

    if (pages === null) return;

    if (pages > 0) {
      return res(ctx.status(200), ctx.json(MOCK_POST_LIST), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
  }),

  rest.get('/posts/votes/me', (req, res, ctx) => {
    const pages = Number(req.url.searchParams.get('pages'));

    if (pages === null) return;

    if (pages > 0) {
      return res(ctx.status(200), ctx.json(MOCK_POST_LIST), ctx.delay(1000));
    }

    return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
  }),
];
