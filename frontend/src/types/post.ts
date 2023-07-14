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
  writer: { id: number; nick: string };
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
