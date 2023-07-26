export const BASE_PATH = {
  HOME: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  POST: '/posts',
  USER: '/users',
  ADMIN: '/admin',
  SEARCH: '/search',
};

export const PATH = {
  ...BASE_PATH,
  POST_WRITE: `${BASE_PATH.POST}/write`,
  POST_WRITE_EDIT: `${BASE_PATH.POST}/write/:postId`,
  POST_DETAIL: `${BASE_PATH.POST}/:postId`,
  POST_VOTE_RESULT: `${BASE_PATH.POST}/result/:postId`,
  POST_CATEGORY: `${BASE_PATH.POST}/category/:categoryId`,
  USER_POST: `${BASE_PATH.USER}/posts`,
  USER_VOTE: `${BASE_PATH.USER}/votes`,
  USER_INFO: `${BASE_PATH.USER}/myPage`,
};
