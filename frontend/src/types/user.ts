export interface User {
  nickname: string;
  gender: 'FEMALE' | 'MALE';
  birthYear: number;
  postCount: number;
  voteCount: number;
  hasLatestAlarm: boolean;
  role: 'ADMIN' | 'USER';
}

export interface LoggedInfo {
  isLoggedIn: boolean;
  id?: number;
  userInfo?: User;
}
