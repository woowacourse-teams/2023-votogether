import {
  DefaultBodyType,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
  rest,
} from 'msw';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

export const mockPostList = [
  rest.get('/posts', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/categories/:categoryId', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/me', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/votes/me', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/votes/me', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
  }),

  rest.get('/posts/search', (req, res, ctx) => {
    return createMockPostListResponse(req, res, ctx);
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
