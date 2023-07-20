export interface User {
  nickname: string;
  userPoint: number;
  postCount: number;
  voteCount: number;
  badge?: string;
}

export interface ServerUser {
  nickname: string;
  userPoint: number;
  postCount: number;
  voteCount: number;
  badge?: string;
}
