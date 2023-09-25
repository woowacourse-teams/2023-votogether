import { ReportInfo, ReportType } from '@type/report';

import { REPORT_MESSAGE } from '@constants/policyMessage';

export const REPORT_TYPE: Record<ReportType, ReportInfo> = {
  POST: { name: '게시글 신고', reportMessageList: REPORT_MESSAGE },
  COMMENT: { name: '댓글 신고', reportMessageList: REPORT_MESSAGE },
  NICKNAME: { name: '닉네임 신고', reportMessageList: REPORT_MESSAGE },
};
