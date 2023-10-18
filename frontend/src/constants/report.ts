export const REPORT_TYPE = {
  POST: '게시글',
  COMMENT: '댓글',
  NICKNAME: '닉네임',
} as const;

export const REPORT_ACTION_TYPE = {
  [REPORT_TYPE.POST]: '삭제',
  [REPORT_TYPE.COMMENT]: '삭제',
  [REPORT_TYPE.NICKNAME]: '수정',
} as const;
