import { rest } from 'msw';

export const createEditPostTest = [
  //게시글 작성
  rest.post('/posts', (req, res, ctx) => {
    window.console.log('게시글 작성 완료', req.body);

    return res(ctx.status(201));
  }),

  //게시글 수정
  rest.put('/posts/1', (req, res, ctx) => {
    window.console.log('게시글 수정 완료', req.body);

    return res(ctx.status(200));
  }),
];
