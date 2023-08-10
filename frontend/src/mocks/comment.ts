import { rest } from 'msw';

import { MOCK_COMMENT_LIST } from './mockData/comment';

export const mockComment = [
  rest.get(`/posts/:postId/comments`, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(MOCK_COMMENT_LIST));
  }),

  rest.post('/posts/:postId/comments', (req, res, ctx) => {
    window.console.log('등록한 댓글 내용', req.body);

    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({ message: '댓글이 성공적으로 등록되었습니다!!' })
    );
  }),

  rest.put('/posts/:postId/comments/:commentId', (req, res, ctx) => {
    window.console.log('수정한 댓글 내용', req.body);

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: '댓글이 성공적으로 수정되었습니다!!' })
    );
  }),

  rest.delete('/posts/:postId/comments/:commentId', (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(204));
  }),
];
