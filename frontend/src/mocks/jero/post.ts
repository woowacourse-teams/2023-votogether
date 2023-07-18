import { rest } from 'msw';

export const createEditPostTest = [
  //게시글 작성
  rest.post('/posts', (req, res, ctx) => {
    window.console.log('게시글 작성 완료', req.body);

    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({ message: '게시글이 성공적으로 생성되었습니다!!' })
    );
  }),

  //게시글 수정
  rest.put('/posts/1', (req, res, ctx) => {
    window.console.log('게시글 수정 완료', req.body);

    return res(
      ctx.delay(1000),
      ctx.status(201),
      ctx.json({ message: '게시글이 성공적으로 수정되었습니다!!' })
    );
  }),
];
