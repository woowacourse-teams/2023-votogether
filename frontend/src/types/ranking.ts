export interface PassionUserRanking {
  ranking: number;
  nickname: string;
  postCount: number;
  voteCount: number;
  score: number;
}

export interface PopularPostRanking {
  ranking: number;
  post: {
    id: number;
    writer: string;
    title: string;
    voteCount: number;
  };
}
