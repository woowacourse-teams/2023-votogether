import { PostRequestKind, PostSorting, PostStatus } from '@components/post/PostListPage/types';

export interface WrittenVoteOptionType {
  id: number;
  text: string;
  peopleCount: number;
  percent: number;
  imageUrl: string;
}

export interface WrittenVoteOptionTypeResponse {
  optionId: number;
  content: string;
  voteCount: number;
  votePercent: number;
  imageUrl: string;
}

export interface PostInfo {
  postId: number;
  title: string;
  writer: { id: number; nickname: string };
  content: string;
  imageUrl: string;
  category: { id: number; name: string }[];
  createTime: string;
  deadline: string;
  voteInfo: {
    selectedOptionId: number;
    allPeopleCount: number;
    options: WrittenVoteOptionType[];
  };
}

export interface PostInfoResponse {
  postId: number;
  title: string;
  writer: { id: number; nickname: string };
  content: string;
  imageUrl: string;
  categories: { id: number; name: string }[];
  createdAt: string;
  deadline: string;
  voteInfo: {
    selectedOptionId: number;
    totalVoteCount: number;
    options: WrittenVoteOptionTypeResponse[];
  };
}

export interface PostList {
  pageNumber: number;
  postList: PostInfo[];
}

export interface PostListByRequiredOption {
  postType: PostRequestKind;
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
  isLoggedIn: boolean;
}

export interface PostListByOptionalOption {
  categoryId: number;
  keyword: string;
}
