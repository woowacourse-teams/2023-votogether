export interface User {
  nickname: string;
  gender: string;
  birthYear: number;
  postCount: number;
  voteCount: number;
}

export interface UserInfoResponse {
  nickname: string;
  gender: string;
  birthYear: number;
  postCount: number;
  voteCount: number;
}

export interface ModifyNicknameRequest {
  nickname: string;
}

export interface LoggedInfo {
  accessToken: string;
  isLoggedIn: boolean;
  id?: number;
  userInfo?: User;
}

export interface UpdateUserInfoRequest {
  gender: 'MALE' | 'FEMALE';
  birthYear: number;
}
