export const BASE_PATH = {
  HOME: '/',

  LANDING: '/landing',
  LOGIN: '/login',

  POST: '/posts',

  USER: '/users',

  ADMIN: '/admin',
};

export const PATH = {
  ...BASE_PATH,

  POST_WRITE: `${BASE_PATH.POST}/write`,
  POST_DETAIL: `${BASE_PATH.POST}/:postId`,
  POST_VOTE_RESULT: `${BASE_PATH.POST}/:postId/results`,

  USER_POST: `${BASE_PATH.USER}/posts`,
  USER_VOTE: `${BASE_PATH.USER}/votes`,
};
