export interface PassionUser {
  rank: number;
  nickname: string;
  postCount: number;
  voteCount: number;
  score: number;
}

export interface RankingPost {
  rank: number;
  post: {
    id: number;
    writer: string;
    title: string;
    voteCount: number;
  };
}
