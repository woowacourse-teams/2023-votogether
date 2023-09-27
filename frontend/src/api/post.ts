import { PostInfo, PostListByOptionalOption, PostListByRequiredOption } from '@type/post';
import { StringDate } from '@type/time';

import {
  DEFAULT_CATEGORY_ID,
  POST_TYPE,
  REQUEST_POST_KIND_URL,
  SEARCH_KEYWORD,
} from '@constants/api';
import { REQUEST_SORTING_OPTION, REQUEST_STATUS_OPTION } from '@constants/post';

import {
  getFetch,
  patchFetch,
  postFetch,
  multiPutFetch,
  multiPostFetch,
  deleteFetch,
} from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

interface WrittenVoteOptionTypeResponse {
  optionId: number;
  content: string;
  voteCount: number;
  votePercent: number;
  imageUrl: string;
}

export interface PostDetailResponse {
  postId: number;
  title: string;
  writer: { id: number; nickname: string };
  content: string;
  imageUrl: string;
  categories: { id: number; name: string }[];
  createdAt: StringDate;
  deadline: StringDate;
  imageCount: number;
  commentCount: number;
  voteInfo: {
    selectedOptionId: number;
    totalVoteCount: number;
    options: WrittenVoteOptionTypeResponse[];
  };
}

export const transformPostResponse = (post: PostDetailResponse): PostInfo => {
  return {
    category: post.categories.map(category => ({ id: category.id, name: category.name })),
    content: post.content,
    deadline: post.deadline,
    imageUrl: post.imageUrl,
    postId: post.postId,
    createTime: post.createdAt,
    imageCount: post.imageCount,
    commentCount: post.commentCount,
    title: post.title,
    voteInfo: {
      allPeopleCount: post.voteInfo.totalVoteCount,
      selectedOptionId: post.voteInfo.selectedOptionId,
      options: post.voteInfo.options.map(option => ({
        id: option.optionId,
        text: option.content,
        peopleCount: option.voteCount,
        percent: option.votePercent,
        imageUrl: option.imageUrl,
      })),
    },
    writer: {
      id: post.writer.id,
      nickname: post.writer.nickname,
    },
  };
};

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch(`${BASE_URL}/posts/${postId}/options/${optionId}`, '');
};

export interface OptionData {
  originOptionId: number;
  newOptionId: number;
}

export const changeVotedOption = async (postId: number, optionData: OptionData) => {
  return await patchFetch(
    `${BASE_URL}/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`
  );
};

export const getPost = async (postId: number): Promise<PostInfo> => {
  const post = await getFetch<PostDetailResponse>(`${BASE_URL}/posts/${postId}`);

  return transformPostResponse(post);
};

export const getPostForGuest = async (postId: number): Promise<PostInfo> => {
  const post = await getFetch<PostDetailResponse>(`${BASE_URL}/posts/${postId}/guest`);

  return transformPostResponse(post);
};

export const createPost = async (newPost: FormData) => {
  return await multiPostFetch(`${BASE_URL}/posts`, newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`${BASE_URL}/posts/${postId}`, updatedPost);
};

export const deletePost = async (postId: number) => {
  return await deleteFetch(`${BASE_URL}/posts/${postId}`);
};

export const setEarlyClosePost = async (postId: number) => {
  return await patchFetch(`${BASE_URL}/posts/${postId}/close`);
};

export const makePostListUrl = (
  requiredOption: PostListByRequiredOption,
  optionalOption: PostListByOptionalOption
) => {
  const { pageNumber, postSorting, postStatus, postType, isLoggedIn } = requiredOption;
  const { categoryId, keyword } = optionalOption;

  const requestedStatus = REQUEST_STATUS_OPTION[postStatus];
  const requestedSorting = REQUEST_SORTING_OPTION[postSorting];

  const POST_BASE_URL = `${BASE_URL}/${REQUEST_POST_KIND_URL[postType]}${
    isLoggedIn ? '' : '/guest'
  }`;
  const OPTION_URL = `postClosingType=${requestedStatus}&postSortType=${requestedSorting}&page=${pageNumber}`;

  if (categoryId > DEFAULT_CATEGORY_ID && postType === POST_TYPE.CATEGORY) {
    return `${POST_BASE_URL}?${OPTION_URL}&category=${categoryId}`;
  }

  if (postType === POST_TYPE.SEARCH) {
    return `${POST_BASE_URL}?${SEARCH_KEYWORD}=${keyword}&${OPTION_URL}`;
  }

  return `${POST_BASE_URL}?${OPTION_URL}`;
};

export const getPostList = async (
  requiredOption: PostListByRequiredOption,
  optionalOption: PostListByOptionalOption
) => {
  const { pageNumber } = requiredOption;

  const postListUrl = makePostListUrl(requiredOption, optionalOption);

  const postList = await getFetch<PostDetailResponse[]>(postListUrl);

  return {
    pageNumber,
    postList: postList.map(post => transformPostResponse(post)),
  };
};
