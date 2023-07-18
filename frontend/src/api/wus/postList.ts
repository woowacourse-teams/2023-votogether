import { PostInfo } from '@type/post';

import { PostStatusType, SortingOptionType } from '@components/post/PostListPage/constants/option';

import { getFetch } from '@utils/fetch';

interface GetPostListParams {
  postStatus: PostStatusType;
  postSorting: SortingOptionType;
}

export const getPostList = async ({ postStatus, postSorting }: GetPostListParams) => {
  const status = postStatus === 'progress' ? 'true' : 'false';
  const sorting = postSorting === 'popular' ? 'hot' : 'latest';

  return await getFetch<PostInfo[]>(`/posts?status=${status}&sorting=${sorting}`);
};
