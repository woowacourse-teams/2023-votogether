export const POST_TYPE = {
  ALL: 'posts',
  MY_POST: 'myPost',
  MY_VOTE: 'myVote',
  CATEGORY: 'category',
  SEARCH: 'search',
} as const;

export const REQUEST_POST_KIND_URL = {
  [POST_TYPE.ALL]: 'posts',
  [POST_TYPE.MY_POST]: 'posts/me',
  [POST_TYPE.MY_VOTE]: 'posts/votes/me',
  [POST_TYPE.CATEGORY]: 'posts',
  [POST_TYPE.SEARCH]: 'posts/search',
} as const;

/**
 * 프론트앤드에서 카테고리 조회를 확인하기 위한 조건문에 필요한 정보입니다.
 */
export const DEFAULT_CATEGORY_ID = 0;

export const POST_AMOUNT_PER_PAGE = 10;
export const ALARM_AMOUNT_PER_PAGE = 10;

/**
 * 백앤드로 보낼때 검색 쿼리키로 사용하는 문자입니다. ?keyword="검색어"
 */
export const SEARCH_KEYWORD = 'keyword';
