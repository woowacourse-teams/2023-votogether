import { PostRequestKind, PostSorting, PostStatus } from '@pages/HomePage/types';

import { StringDate } from './time';

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
  createTime: StringDate;
  imageCount: number;
  commentCount: number;
  deadline: StringDate;
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

/**
 * 게시글 리스트를 요청할 때 필수로 지정되어야 하는 조건들
 */
export interface PostListByRequiredOption {
  postType: PostRequestKind;
  postStatus: PostStatus;
  postSorting: PostSorting;
  pageNumber: number;
  isLoggedIn: boolean;
}

/**
 * 게시글 리스트를 요청할 때 선택적으로 지정되는 조건들
 */
export interface PostListByOptionalOption {
  categoryId: number;
  keyword: string;
}
