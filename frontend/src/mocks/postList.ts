import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
  rest,
} from 'msw';

import { MOCK_GUEST_POST_LIST, MOCK_POST_LIST } from '@mocks/mockData/post';

export const mockPostList = [
  rest.get('/posts', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/guest', (req, res, ctx) => {
    return createMockGuestPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/categories/:categoryId', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),
  rest.get('/posts/categories/guest/:categoryId', (req, res, ctx) => {
    return createMockGuestPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/me', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/votes/me', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/search', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/search/guest', (req, res, ctx) => {
    return createMockGuestPostListResponse(req, res, ctx);
  }),
];

const createMockPostListResponse = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
) => {
  const page = Number(req.url.searchParams.get('page'));

  const keyword = req.url.searchParams.get('keyword');

  if (page === null) return;

  if (keyword === '999') {
    return res(ctx.status(200), ctx.json([]));
  }

  if (page > 0) {
    return res(ctx.status(200), ctx.json(MOCK_POST_LIST), ctx.delay(1000));
  }

  return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
};

const createMockGuestPostListResponse = (
  req: RestRequest<never, PathParams<string>>,
  res: ResponseComposition<DefaultBodyType>,
  ctx: RestContext
) => {
  const page = Number(req.url.searchParams.get('page'));

  if (page === null) return;

  if (page > 0) {
    return res(ctx.status(200), ctx.json(MOCK_GUEST_POST_LIST), ctx.delay(1000));
  }

  return res(ctx.status(200), ctx.json(MOCK_GUEST_POST_LIST));
};
