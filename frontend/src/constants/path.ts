export const BASE_PATH = {
  HOME: '/',
  LANDING: '/landing',
  LOGIN: '/login',
  POST: '/posts',
  USER: '/users',
  ADMIN: '/admin',
  SEARCH: '/search',
  RANKING: '/ranking',
  ANNOUNCEMENT: '/announcements',
  NOTICES: '/notices',
  REPORT: '/reports',
  ALARM: '/alarms',
};

export const PATH = {
  ...BASE_PATH,
  POST_WRITE: `${BASE_PATH.POST}/write`,
  POST_VOTE_RESULT: `${BASE_PATH.POST}/result`,
  POST_CATEGORY: `${BASE_PATH.POST}/category`,
  USER_POST: `${BASE_PATH.USER}/posts`,
  USER_VOTE: `${BASE_PATH.USER}/votes`,
  USER_INFO: `${BASE_PATH.USER}/myPage`,
  USER_INFO_REGISTER: `${BASE_PATH.USER}/register`,
  PENDING_REPORT: `${BASE_PATH.ADMIN}${BASE_PATH.REPORT}/pending`,
  REPORT_ALARM: `${BASE_PATH.ALARM}/report`,
};
