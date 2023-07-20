import { rest } from 'msw';

import { MOCK_CATEGORY_LIST, MOCK_GUEST_CATEGORY_LIST } from '@mocks/mockData/categoryList';

export const mockCategoryHandlers = [
  rest.get('/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_CATEGORY_LIST));
  }),

  rest.get('/categories/guest', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MOCK_GUEST_CATEGORY_LIST));
  }),

  rest.post('/categories/:categoryId/like', (req, res, ctx) => {
    MOCK_CATEGORY_LIST[1].favorite = true;

    return res(ctx.status(201), ctx.json({ message: 'ok' }));
  }),

  rest.delete('/categories/:categoryId/like', (req, res, ctx) => {
    MOCK_CATEGORY_LIST[0].favorite = false;

    return res(ctx.status(204), ctx.json({ message: 'ok' }));
  }),
];
