export interface WrittenVoteOptionType {
  id: number;
  text: string;
  peopleCount: number;
  percent: number;
  imageUrl?: string;
}

export interface PostInfo {
  postId: number;
  title: string;
  writer: { id: number; nickname: string };
  content: string;
  category: { id: number; name: string }[];
  startTime: string;
  endTime: string;
  voteInfo: {
    selectedOptionId: number;
    allPeopleCount: number;
    options: WrittenVoteOptionType[];
  };
}

export interface TextData {
  categoryIds: number[];
  title: string;
  content: string;
  postOptions: string[];
  deadline?: string;
}
export interface PostRequest {
  texts: TextData;
  images: File[];
}
