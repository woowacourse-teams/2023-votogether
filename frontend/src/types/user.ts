export interface User {
  nickname: string;
  gender: 'FEMALE' | 'MALE';
  birthYear: number;
  postCount: number;
  voteCount: number;
}

export interface UserInfoResponse {
  nickname: string;
  gender: 'FEMALE' | 'MALE';
  birthYear: number;
  postCount: number;
  voteCount: number;
}

export interface ModifyNicknameRequest {
  nickname: string;
}

export interface LoggedInfo {
  isLoggedIn: boolean;
  id?: number;
  userInfo?: User;
}

export interface UpdateUserInfoRequest {
  gender: 'MALE' | 'FEMALE';
  birthYear: number;
}
