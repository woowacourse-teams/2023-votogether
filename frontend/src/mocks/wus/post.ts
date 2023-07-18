import { rest } from 'msw';

import { MOCK_POST_LIST } from '@mocks/mockData/postList';

export const postListHandlers = [
  rest.get('/posts', (req, res, ctx) => {
    const status = req.url.searchParams.get('status');
    const sorting = req.url.searchParams.get('sorting');

    window.console.log(status, sorting);

    return res(ctx.status(200), ctx.json(MOCK_POST_LIST));
  }),
];
