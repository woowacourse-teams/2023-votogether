import { rest } from 'msw';

export const votePostTest = [
  //투표
  rest.post(`/posts/1111111/options/12312`, (req, res, ctx) => {
    console.log('투표 ㅇㅋ');
    return res(ctx.status(200));
  }),

  rest.post(`/posts/1111111/options/12314`, (req, res, ctx) => {
    console.log('투표 ㅇㅋ');
    return res(ctx.status(200));
  }),

  rest.post(`/posts/1111111/options/123152`, (req, res, ctx) => {
    console.log('투표 ㅇㅋ');
    return res(ctx.status(200));
  }),

  rest.post(`/posts/1111111/options/123122`, (req, res, ctx) => {
    console.log('투표 ㅇㅋ');
    return res(ctx.status(200));
  }),

  //선택지 수정
  rest.patch(`/posts/1111112/options?source=12312&target=12314`, (req, res, ctx) => {
    console.log('투표 변경ㅇㅋ');

    return res(ctx.status(200));
  }),

  rest.patch(`/posts/1111112/options?source=12312&target=123152`, (req, res, ctx) => {
    console.log('투표 변경ㅇㅋ');

    return res(ctx.status(200));
  }),

  rest.patch(`/posts/1111112/options?source=12312&target=123122`, (req, res, ctx) => {
    console.log('투표 변경ㅇㅋ');

    return res(ctx.status(200));
  }),
];
