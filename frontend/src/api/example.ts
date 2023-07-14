// 게시물을 가져오는 예시 코드

/**
 * 게시물 get: api/posts
 * 게시물 post: api/posts
 */
import { deleteFetch, getFetch, patchFetch, postFetch, putFetch } from '@utils/fetch';

interface Post {
  id: number;
  text: string;
}

export const getPostList = async () => {
  return await getFetch<Post[]>('api/posts');
};

export const createPost = async () => {
  return await postFetch<Post, { id: number }>('api/posts', { id: 12, text: '생성' });
};

export const editPost = async () => {
  return await putFetch<Post, { id: number }>('api/posts', { id: 12, text: '생성' });
};

// remove or delete
export const deletePost = async () => {
  return await deleteFetch('api/posts/1');
};

/**
 *
 * patch와 put은 edit을 접두어로 붙힌다. 어색하다면 바꾼다.
 */
export const editOption = async () => {
  return await patchFetch('api/posts/1/213123');
};
