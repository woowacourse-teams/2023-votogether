export interface User {
  nickname: string;
  userPoint: number;
  postCount: number;
  voteCount: number;
  badge?: string;
}

export interface UserInfoResponse {
  nickname: string;
  userPoint: number;
  postCount: number;
  voteCount: number;
  badge?: string;
}

export interface ModifyNicknameRequest {
  nickname: string;
}
