export const USER_REPORT_KIND = {
  ADVERTISING: 'advertisingNickname',
  INVALID: 'invalidNickname',
  SPAMMING: 'spamming',
} as const;

export const USER_REPORT_MESSAGE = {
  [USER_REPORT_KIND.ADVERTISING]: '광고성 닉네임',
  [USER_REPORT_KIND.INVALID]: '부적절한 닉네임',
  [USER_REPORT_KIND.SPAMMING]: '도배성 컨텐츠 작성',
};
