export const COMMENT_REPORT_KIND = {
  BEHAVIOR: 'behavior',
  SPAMMING: 'spamming',
  ADVERTISING: 'advertising',
  EXPLICIT: 'explicit',
} as const;

export const COMMENT_REPORT_MESSAGE = {
  [COMMENT_REPORT_KIND.BEHAVIOR]: '부적절한 언행',
  [COMMENT_REPORT_KIND.SPAMMING]: '도배성 댓글 작성',
  [COMMENT_REPORT_KIND.ADVERTISING]: '광고성 댓글 작성',
  [COMMENT_REPORT_KIND.EXPLICIT]: '성적인 댓글 작성',
};
