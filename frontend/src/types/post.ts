import { PostRequestKind, PostSorting, PostStatus } from '@components/post/PostListPage/types';

export interface WrittenVoteOptionType {
  id: number;
  text: string;
  peopleCount: number;
  percent: number;
  imageUrl: string;
}

export interface PostInfo {
  postId: number;
  title: string;
  writer: { id: number; nickname: string };
  content: string;
  imageUrl: string;
  category: { id: number; name: string }[];
  startTime: string;
  endTime: string;
  voteInfo: {
    selectedOptionId: number;
    allPeopleCount: number;
    options: WrittenVoteOptionType[];
  };
}

export interface PostList {
  pageNumber: number;
  postList: PostInfo[];
}

export interface PostListByOption {
  postType: PostRequestKind;
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
  categoryId?: number;
  keyword?: string;
}
