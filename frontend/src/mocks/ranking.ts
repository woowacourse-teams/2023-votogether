import { rest } from 'msw';

import { PassionUser, RankingPost } from '@type/ranking';

const userRankingInfo: PassionUser = {
  ranking: 1111,
  nickname: 'wow',
  postCount: 1,
  voteCount: 3,
  score: 8,
};

const rankerInfo: PassionUser = {
  ranking: 1,
  nickname: 'gil-dong',
  postCount: 11,
  voteCount: 79,
  score: 134,
};

const rankerList: PassionUser[] = new Array(10)
  .fill(rankerInfo)
  .map((ranker, index) => ({ ...ranker, rank: index + 1 }));

const rankingPostInfo: RankingPost = {
  ranking: 1,
  post: {
    id: 29,
    writer: 'writer',
    title: '이것은 엄청나게 많은 투표가 이루어진 대단한 글이지요',
    voteCount: 10,
  },
};
const rankingPostList: RankingPost[] = new Array(10)
  .fill(rankingPostInfo)
  .map((post, index) => ({ ...post, ranking: index + 1 }));

export const mockRanking = [
  rest.get('/members/me/ranking', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userRankingInfo));
  }),

  rest.get('/members/ranking/passion/guest', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rankerList));
  }),

  rest.get('/posts/ranking/popular/guest', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rankingPostList));
  }),
];
