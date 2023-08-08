import { ReportInfo, ReportType } from '@type/report';

export const REPORT_MESSAGE = {
  BEHAVIOR: '부적절한 언행/혐오/차별적 표현이 포함되어있습니다.',
  SPAMMING: '도배성 내용이 포함되어있습니다.',
  ADVERTISING: '광고성 내용이 포함되어있습니다.',
  SENSUALITY: '음란성 내용이 포함되어 있습니다.',
  SPECIFIC_PERSON: '특정인이 거론되어있습니다.',
  PRIVACY: '개인정보가 포함되어있습니다.',
};

export const REPORT_TYPE: Record<ReportType, ReportInfo> = {
  POST: { name: '게시글 신고', reportMessageList: REPORT_MESSAGE },
  COMMENT: { name: '댓글 신고', reportMessageList: REPORT_MESSAGE },
  NICKNAME: { name: '닉네임 신고', reportMessageList: REPORT_MESSAGE },
};
