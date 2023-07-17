import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@type/post';

import { getPostList } from '@api/wus/postList';

export const usePostList = () => {
  const { data, error, isLoading } = useQuery<PostInfo[]>(['posts'], getPostList);

  return { data, error, isLoading };
};
