import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setEarlyClosePost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useEarlyClosePost = (postId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: () => setEarlyClosePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POST_DETAIL, postId]);
    },
    onError: error => {
      window.console.log('조기마감에 실패했습니다.', error);
    },
  });

  return { mutate, isError, error };
};
