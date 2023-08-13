import { rest } from 'msw';

import { MOCK_GUEST_POST_INFO, MOCK_POST_INFO } from './mockData/post';

export const mockPost = [
  rest.get('/posts/:postId', (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(MOCK_POST_INFO));
  }),

  rest.get('/posts/:postId/guest', (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(MOCK_GUEST_POST_INFO));
  }),

  rest.delete('/posts/:postId', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: '게시글이 성공적으로 삭제되었습니다' })
    );
  }),

  rest.patch('/posts/:postId/close', (req, res, ctx) => {
    MOCK_POST_INFO.deadline = '2023-07-13 18:40';

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: '게시글이 성공적으로 조기 마감 되었습니다' })
    );
  }),

  //게시글 작성
  rest.post('/posts', (req, res, ctx) => {
    window.console.log('게시글 작성 완료', req.body);

    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({ message: '게시글이 성공적으로 생성되었습니다' })
    );
  }),

  //게시글 수정
  rest.put('/posts/:postId', (req, res, ctx) => {
    window.console.log('게시글 수정 완료되었습니다', req.body);

    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: '게시글이 성공적으로 수정되었습니다!!' })
    );
  }),

  //게시글 삭제
  rest.delete('/posts/:postId', (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ message: '게시글이 성공적으로 삭제되었습니다!!' })
    );
  }),
];
