import { PendingReportActionListResponse } from '@type/report';

export const MOCK_PENDING_REPORT_LIST: PendingReportActionListResponse = {
  totalPageNumber: 5,
  currentPageNumber: 0,
  reports: [
    {
      id: 0,
      type: 'POST',
      reasons: ['스팸성입니다', '도배성입니다'],
      target: '보투게더는 바보라고 생각하는 게시글',
      createdAt: '2023-10-12 12:20',
    },
    {
      id: 1,
      type: 'COMMENT',
      reasons: ['스팸성입니다', '도배성입니다', '홍보성입니다'],
      target: '보투게더는 바보라고 생각하는 댓글',
      createdAt: '2023-10-12 12:21',
    },
    {
      id: 3,
      type: 'NICKNAME',
      reasons: ['스팸성입니다', '도배성입니다'],
      target: '보투게더바보',
      createdAt: '2023-10-12 12:22',
    },
  ],
};
