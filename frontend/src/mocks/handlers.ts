import { mockAlarm } from './alarm';
import { mockCategoryHandlers } from './categoryList';
import { mockComment } from './comment';
import { example } from './example/get';
import { mockVoteResult } from './getVoteDetail';
import { mockNotice } from './notice';
import { mockPost } from './post';
import { mockPostList } from './postList';
import { mockRanking } from './ranking';
import { mockReport } from './report';
import { mockReportApproveResult } from './reportApproveResult';
import { mockToken } from './token';
import { mockUserInfo } from './userInfo';
import { mockVote } from './vote';

export const handlers = [
  ...example,
  ...mockPostList,
  ...mockPost,
  ...mockVoteResult,
  ...mockVote,
  ...mockCategoryHandlers,
  ...mockUserInfo,
  ...mockComment,
  ...mockReport,
  ...mockRanking,
  ...mockToken,
  ...mockAlarm,
  ...mockReportApproveResult,
  ...mockNotice,
];
