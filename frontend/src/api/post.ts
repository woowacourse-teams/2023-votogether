import { PostInfo, PostInfoResponse } from '@type/post';

import {
  getFetch,
  patchFetch,
  postFetch,
  multiPutFetch,
  multiPostFetch,
  deleteFetch,
} from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const transformPostResponse = (post: PostInfoResponse): PostInfo => {
  return {
    category: post.categories.map(category => ({ id: category.id, name: category.name })),
    content: post.content,
    deadline: post.deadline,
    imageUrl: post.imageUrl,
    postId: post.postId,
    createTime: post.createdAt,
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
  const post = await getFetch<PostInfoResponse>(`${BASE_URL}/posts/${postId}`);

  return transformPostResponse(post);
};

export const createPost = async (newPost: FormData) => {
  return await multiPostFetch(`${BASE_URL}/posts`, newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`${BASE_URL}/posts/${postId}`, updatedPost);
};

export const removePost = async (postId: number) => {
  return await deleteFetch(`${BASE_URL}/posts/${postId}`);
};

export const setEarlyClosePost = async (postId: number) => {
  return await patchFetch(`${BASE_URL}/posts/${postId}/close`);
};
