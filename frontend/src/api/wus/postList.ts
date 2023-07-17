import { PostInfo } from '@type/post';

import { getFetch } from '@utils/fetch';

export const getPostList = async () => {
  return await getFetch<PostInfo[]>('/posts');
};
