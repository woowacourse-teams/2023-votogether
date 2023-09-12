export interface PassionUser {
  ranking: number;
  nickname: string;
  postCount: number;
  voteCount: number;
  score: number;
}

export interface RankingPost {
  ranking: number;
  post: {
    id: number;
    writer: string;
    title: string;
    voteCount: number;
  };
}
